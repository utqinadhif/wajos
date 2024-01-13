import Navbar from './navbar'
import Card from './card'

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="px-4 py-6 space-y-2">
                <div className="font-semibold text-lg mb-5">
                    Selamat datang di aplikasi Wa Joss
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <Card title="Jumlah Akun" description={`10 Orang`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
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
                            <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                            <path d="M8 14l0 .01" />
                            <path d="M12 14l0 .01" />
                            <path d="M16 14l0 .01" />
                            <path d="M8 17l0 .01" />
                            <path d="M12 17l0 .01" />
                            <path d="M16 17l0 .01" />
                        </svg>
                    </Card>
                </div>
            </main>
        </>
    )
}

export default Home
