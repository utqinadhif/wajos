import {
    isSessionExists,
    createSession,
    getSession,
    getAllSession,
    deleteSession,
} from './../whatsapp.js'
import response from './../response.js'

const find = (req, res) => {
    if (isSessionExists(req.params.id)) {
        return response(res, 200, true, 'Session found.')
    }

    response(res, 404, false, 'Session not found.')
}

const check = (req, res) => {
    const { id } = req.body

    const session = getSession(id)

    const user = session?.user

    if (user) return response(res, 200, true, 'User connected.')

    response(res, 404, false, 'User not connect.')
}

const add = (req, res) => {
    const { id } = req.body

    if (isSessionExists(id)) {
        return response(
            res,
            409,
            false,
            'Session already exists, please use another id.'
        )
    }

    createSession(id, res)
}

const del = async (req, res) => {
    const { id } = req.params
    const session = getSession(id)

    if (session) {
        try {
            await session.logout()
        } catch {
        } finally {
            deleteSession(id)
        }
    }

    response(res, 200, true, 'The session has been successfully deleted.')
}

const all = (req, res) => {
    const session = getAllSession()

    if (session) return response(res, 200, true, 'Success get all session', session)

    response(res, 404, false, 'Session not found.')
}

export { find, add, del, check, all }
