'use client'
import Add from './add'

const Lists = () => {
    const list = async () => {
        const addApi = await fetch('http://localhost:2000/session/all', {
            cache: 'no-store',
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const res = await addApi.json()
        console.log(res.data)
    }
    list()

    return (
        <>
            <div className="mb-5 flex justify-between">
                <div className="font-semibold text-lg">List WA</div>
                <Add />
            </div>
            <div>
                <div className="rounded-lg bg-gray-400/10 p-3 shadow-md hover:bg-gray-400/20 sm:p-3 md:p-4">
                    <div className="mb-3">
                        <div className="text-base font-semibold text-rose-500 uppercase">
                            nama session
                        </div>
                    </div>
                    <button
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        Hapus
                    </button>
                </div>
            </div>
        </>
    )

}

export default Lists
