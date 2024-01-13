import Navbar from '../navbar'

const Inbox = () => {
    return (
        <>
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-6 space-y-2">
                <div className="font-semibold text-lg mb-5">Inbox</div>
                <div>
                    <div className="rounded-lg bg-green-400/10 p-3 shadow-md hover:bg-green-400/20 sm:p-3 md:p-4">
                        <div className="mb-3">
                            <div className="text-base font-semibold text-rose-500">
                                dr. DWI ADHI NUGRAHA Sp.PD
                            </div>
                            <div className="text-xs">13 Januari 2024</div>
                        </div>
                        <div className="font-semibold">6285290351508</div>
                        <div className="whitespace-pre-wrap">
                            Assalamualaikum Wr. Wb Dengan senang hati kami dari
                            Rumah Sakit Islam Pati menginformasikan kepada yth
                            Ny. SITI MUSTARIKHAH - 215447 untuk kontrol ke Ruang
                            Perawatan IV dengan dr. DWI ADHI NUGRAHA Sp.PD
                            jadwal kontrol besok pada hari Sabtu tanggal13
                            Januari 2024 pukul 10:00:00 s/d 12:00:00 Bpk/Ibu
                            diharapkan datang 1 jam sebelum pemeriksaan
                            dimulai.jika ada pemeriksaan laboratorium/Radiologi
                            Bpk/Ibu silahkan datang 2 jam sebelum pemeriksaan
                            dilakukan . Terimakasih atas kepercayaan yg
                            bapak/ibu berikan Apabila ada saran dan masukan
                            kepada kami mohon dapat di sampaikan ke
                            https://wa.me/6281390100120 bantu kami menjadi lebih
                            baik Wassalamualaikum Wr. Wb.{' '}
                        </div>
                        <div className="mt-4">
                            <div className="whitespace-pre-wrap text-green-500">
                                The message has been successfully sent.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Inbox
