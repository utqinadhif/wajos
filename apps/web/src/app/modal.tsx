'use client'
import { useState, useEffect } from 'react'

type ModalProps = {
    show: boolean
    title: string
    children: any
    callback: CallableFunction
}

const Modal: React.FC<ModalProps> = ({ show, title, children, callback }) => {
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        setModalShow(show)
    }, [show])

    return (
        modalShow && (
            <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
                <div className="flex min-h-screen items-end justify-center px-4 text-center sm:block sm:p-0 md:items-center">
                    <div className="fixed inset-0 bg-green-50/10 transition-opacity"></div>
                    <div className="my-20 inline-block w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all dark:bg-slate-800 2xl:max-w-2xl">
                        <div className="mb-4 flex items-center justify-between rounded-t border-b pb-2 dark:border-slate-600 sm:mb-5">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-500">
                                {title}
                            </h3>
                            <button
                                onClick={() => {
                                    setModalShow(false)
                                    callback(false)
                                }}
                                type="button"
                                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-slate-400 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-white"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        )
    )
}

export default Modal
