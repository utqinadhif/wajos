'use client'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const menu = [
        {
            url: '/listWa',
            caption: 'List WA',
        },
        {
            url: '/inbox',
            caption: 'Inbox',
        },
    ]

    const [openNavMobile, setOpenNavMobile] = useState(false)

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setOpenNavMobile((current) => !current)
                            }
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/">
                            <div className="flex flex-shrink-0 items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-auto text-green-400"
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
                                    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                                </svg>
                                <div className="text-green-400 font-bold">
                                    Wa Joss
                                </div>
                            </div>
                        </Link>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {menu.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.url}
                                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                        aria-current="page"
                                    >
                                        {item.caption}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="transition-all ease-in-out delay-300 sm:hidden"
                style={{ display: openNavMobile ? 'block' : 'none' }}
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {menu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                            aria-current="page"
                        >
                            {item.caption}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
