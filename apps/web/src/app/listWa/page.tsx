import Lists from './lists'
import Navbar from '../navbar'

const ListWa = () => {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-6 space-y-2">
                <Lists />
            </main>
        </>
    )
}

export default ListWa
