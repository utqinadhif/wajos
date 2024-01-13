import { existsSync, readdir, rmSync } from 'fs'
import { join } from 'path'
import { toDataURL } from 'qrcode'
import __dirname from './dirname.js'
import response from './response.js'
import axios from 'axios'

import makeWASocket, {
    useMultiFileAuthState,
    makeInMemoryStore,
    Browsers,
    DisconnectReason,
    delay,
    fetchLatestBaileysVersion,
} from '@whiskeysockets/baileys'

const sessions = new Map()
const retries = new Map()

const sendHook = async (m, sessionId) => {
    if (process.env.N_HOOK_URL) {
        axios({
            method: 'post',
            url: process.env.N_HOOK_URL + 'device/hook',
            data: JSON.stringify({
                data: m,
                session: sessionId,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (response) {
                //handle success
                if (process.env.N_DEBUG == 'true')
                    console.info('nadhif', 'success', response)
            })
            .catch(function (response) {
                //handle error
                if (process.env.N_DEBUG == 'true')
                    console.error('nadhif', 'error', response)
            })
    } else {
        if (process.env.N_DEBUG == 'true')
            console.log('nadhif', 'error', 'No Hook', m)
    }
}

const createSession = async (sessionId, res = null) => {
    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(
        sessionsDir('beopati_' + sessionId)
    )

    const store = makeInMemoryStore({})

    store.readFromFile(sessionsDir(`${sessionId}_store.json`))
    const intervalTemp = setInterval(() => {
        if (!isSessionExists(sessionId)) {
            clearInterval(intervalTemp)
            return
        }
        store.writeToFile(sessionsDir(`${sessionId}_store.json`))
    }, 10000)

    const waConfig = {
        version,
        auth: state,
        printQRInTerminal: process.env.N_QR_TERMINAL || true,
        browser: Browsers.macOS('Desktop'),
        syncFullHistory: true,
    }

    const wa = makeWASocket.default(waConfig)

    store.bind(wa.ev)

    sessions.set(sessionId, { ...wa, store })

    wa.ev.on('creds.update', saveCreds)

    wa.ev.on('chats.set', ({ chats }) => {
        store.chats.insertIfAbsent(...chats)
    })

    wa.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        switch (connection) {
            case 'close':
                const statusCode = lastDisconnect?.error?.output?.statusCode

                if (
                    statusCode === DisconnectReason.loggedOut ||
                    !shouldReconnect(sessionId)
                ) {
                    if (res && !res.headersSent) {
                        response(res, 500, false, 'Unable to create session.')
                    }

                    return deleteSession(sessionId)
                }

                setTimeout(
                    () => {
                        createSession(sessionId, res)
                    },
                    statusCode === DisconnectReason.restartRequired
                        ? 0
                        : parseInt(process.env.RECONNECT_INTERVAL ?? 0)
                )
                break

            case 'connecting':
                console.log('🟡 try to reconnecting.')
                break

            case 'open':
                retries.delete(sessionId)
                await wa.sendPresenceUpdate('available')
                await wa.updateProfileStatus('🟢 Online')
                break

            default:
                break
        }

        if (update.qr) {
            if (res && !res.headersSent) {
                try {
                    const qr = await toDataURL(update.qr)

                    response(
                        res,
                        200,
                        true,
                        'QR code received, please scan the QR code.',
                        { qr }
                    )
                } catch {
                    response(res, 500, false, 'Unable to create QR code.')
                }

                return
            }

            try {
                await wa.logout()
            } catch {
            } finally {
                deleteSession(sessionId)
            }
        }
    })

    wa.ev.on('messages.upsert', async (m) => {
        // await wa.sendMessage(m.messages[0].key.remoteJid, { text: 'Hello there!' })

        const message = m.messages[0]

        if (!message.key.fromMe && m.type === 'notify') {
            await delay(1000)

            // await wa.sendReadReceipt(message.key.remoteJid, message.key.participant, [message.key.id])

            if (message.key.remoteJid != 'status@broadcast')
                await sendHook(m, sessionId)
        }
    })
}

const getSession = (sessionId) => {
    return sessions.get(sessionId) ?? null
}

const getAllSession = () => {
    return sessions
}

const deleteSession = (sessionId) => {
    const sessionFile = 'beopati_' + sessionId
    const storeFile = `${sessionId}_store.json`
    const rmOptions = { force: true, recursive: true }

    if (isSessionFileExists(sessionFile)) {
        rmSync(sessionsDir(sessionFile), rmOptions)
    }

    if (isSessionFileExists(storeFile)) {
        rmSync(sessionsDir(storeFile), rmOptions)
    }

    sessions.delete(sessionId)
    retries.delete(sessionId)
}

const getChatList = (sessionId, isGroup = false) => {
    const filter = isGroup ? '@g.us' : '@s.whatsapp.net'

    return getSession(sessionId).store.chats.filter((chat) => {
        return chat.id.endsWith(filter)
    })
}

const sessionsDir = (sessionId = '') => {
    return join(__dirname, 'sessions', sessionId ? sessionId : '')
}

const isSessionExists = (sessionId) => {
    return sessions.has(sessionId)
}

const isExists = async (session, jid, isGroup = false) => {
    try {
        let result

        if (isGroup) {
            result = await session.groupMetadata(jid)

            return Boolean(result.id)
        }

        ;[result] = await session.onWhatsApp(jid)

        return result.exists
    } catch {
        return false
    }
}

const isSessionFileExists = (name) => {
    return existsSync(sessionsDir(name))
}

const shouldReconnect = (sessionId) => {
    let maxRetries = parseInt(process.env.MAX_RETRIES ?? 0)
    let attempts = retries.get(sessionId) ?? 0

    maxRetries = maxRetries < 1 ? 1 : maxRetries

    if (attempts < maxRetries) {
        ++attempts

        console.log('Reconnecting...', { attempts, sessionId })
        retries.set(sessionId, attempts)

        return true
    }

    return false
}

const init = () => {
    readdir(sessionsDir(), (err, files) => {
        if (err) {
            throw err
        }

        for (const file of files) {
            if (!file.startsWith('beopati_') || file.endsWith('_store')) {
                continue
            }

            const filename = file.replace('.json', '')
            const sessionId = filename.substring(8)

            createSession(sessionId)
        }
    })
}

const cleanup = async () => {
    console.log('Running cleanup before exit.')

    sessions.forEach(async (session, sessionId) => {
        session.store.writeToFile(sessionsDir(`${sessionId}_store.json`))

        await session.updateProfileStatus('🔴 Offline')
        await session.sendPresenceUpdate('unavailable')
    })
}

const formatPhone = (phone) => {
    if (phone.endsWith('@s.whatsapp.net')) {
        return phone
    }

    let formatted = phone.replace(/\D/g, '')

    return (formatted += '@s.whatsapp.net')
}

const formatGroup = (group) => {
    if (group.endsWith('@g.us')) {
        return group
    }

    let formatted = group.replace(/[^\d-]/g, '')

    return (formatted += '@g.us')
}

const sendMessage = async (session, receiver, message, delayMs = 1000) => {
    try {
        await delay(parseInt(delayMs))

        return session.sendMessage(receiver, message)
    } catch {
        return Promise.reject(null) // eslint-disable-line prefer-promise-reject-errors
    }
}

export {
    isSessionExists,
    createSession,
    getSession,
    getAllSession,
    deleteSession,
    getChatList,
    isExists,
    sendMessage,
    formatPhone,
    formatGroup,
    cleanup,
    init,
}
