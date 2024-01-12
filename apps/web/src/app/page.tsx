import Image from 'next/image'

export default async function Page() {
    const apiF = await fetch('http://localhost:2000/session/add', {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'cobaah' + Math.floor(Date.now() / 1000)
        }),
    })
    const res = await apiF.json()

    return (
        <main>
            <Image src={res.data.qr} alt="joss" width={400} height={400}></Image>
        </main>
    );
}
