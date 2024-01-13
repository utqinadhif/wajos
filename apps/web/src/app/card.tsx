'use client'
type CardProps = {
    title: string
    description: string
    children: any
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
    return (
        <div className="group relative flex min-w-0 flex-col break-words rounded-lg border-l-8 border-gray-500 bg-gradient-to-b from-gray-400/20 to-gray-400/10 shadow-md hover:bg-gray-400/20 dark:border-gray-800 dark:hover:border-gray-700">
            <div className="flex-auto p-4">
                <div className="flex flex-row">
                    <div className="w-3/4 max-w-full flex-none px-3">
                        <div>
                            <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                                {title}
                            </p>
                            <h5 className="mb-0 text-2xl font-bold">
                                {description}
                            </h5>
                        </div>
                    </div>
                    <div className="flow-root basis-1/3 px-3">
                        <div className="float-right grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-tl from-yellow-500 to-gray-500 text-white group-hover:from-gray-500 group-hover:to-yellow-500">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
