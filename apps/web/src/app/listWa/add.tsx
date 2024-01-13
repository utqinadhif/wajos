'use client'
import { useState } from 'react'
import Modal from '../modal'
import Image from 'next/image'

const Add = () => {
    const [modalShow, setModalShow] = useState(false)
    const [loadingShow, setLoadingShow] = useState(false)
    const [qrUrl, setQrUrl] = useState('')

    const [modalErrorShow, setModalErrorShow] = useState(false)
    const [modalError, setModalError] = useState('')

    let toCheck: any = undefined
    let toScan: any = undefined

    const checkIsLogin = async (id: string) => {
        const checkApi = await fetch('http://localhost:2000/session/check', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
        const resCheckApi = await checkApi.json()

        if (resCheckApi.success) {
            clearTimeout(toScan)
            clearTimeout(toCheck)
            setModalError('Device connected successfully')
            setModalErrorShow(true)
            setModalShow(false)
            setLoadingShow(false)
            // reload list
        } else {
            if (!toCheck) {
                getQr(id)
                setModalShow(true)
            }
            toCheck = setTimeout(function () {
                checkIsLogin(id)
            }, 5000)
        }
    }

    const getQr = async (id: string) => {
        const addApi = await fetch('http://localhost:2000/session/add', {
            cache: 'no-store',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
        const res = await addApi.json()

        if (res.success) {
            setQrUrl(res.data.qr)
        }

        toScan = setTimeout(function () {
            getQr(id)
        }, 20000)
    }

    const handleClick = async () => {
        setLoadingShow(true)
        const uuid = 'wajoss_' + Math.floor(Date.now() / 1000)
        checkIsLogin(uuid)
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
                {loadingShow && (
                    <div className="mr-2 flex animate-spin justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a9 9 0 1 0 9 9" />
                        </svg>
                    </div>
                )}
                Add WA
            </button>
            <Modal
                show={modalShow}
                title="Tambah WA"
                callback={(props: boolean) => {
                    setModalShow(props)
                    setLoadingShow(props)
                }}
            >
                <div className="flex justify-center items-center">
                    {qrUrl ? (
                        <Image
                            src={qrUrl}
                            alt="qr wa joss"
                            width={400}
                            height={400}
                        ></Image>
                    ) : (
                        <div className="mr-2 flex animate-spin justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-28 w-28"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M12 3a9 9 0 1 0 9 9" />
                            </svg>
                        </div>
                    )}
                </div>
            </Modal>
            <Modal
                show={modalErrorShow}
                title="Peringatan"
                callback={(props: boolean) => {
                    setModalErrorShow(props)
                }}
            >
                {modalError}
            </Modal>
        </>
    )
}
export default Add
