import Image from 'next/image'
import Navbar from '../navbar'

const Tambah = async () => {
    const apiF = await fetch('http://localhost:2000/session/add', {
        cache: 'no-store',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: 'cobaah' + Math.floor(Date.now() / 1000),
        }),
    })
    const res = await apiF.json()

    return (
        <>
            <Navbar />
            <Image
                src={res.data.qr}
                alt="joss"
                width={400}
                height={400}
            ></Image>
        </>
    )
}

export default Tambah
