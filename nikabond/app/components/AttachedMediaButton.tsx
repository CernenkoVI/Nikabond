      import Image from "next/image";

const AttachedMediaButton = () => {
    return (
        <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">

            <div className="flex flex-col-3 space-x-6 justify-center">
                <button className="cursor-pointer p-2">
                    <Image
                        src="/video.png"
                        width={64}
                        height={64}
                        alt="Video icon"
                        className="mb-2 rounded-xl"
                    />
                </button>

                <button className="cursor-pointer p-2 hover:text-lime-700">
                    <Image
                        src="/photo.png"
                        width={64}
                        height={64}
                        alt="Photo icon"
                        className="mb-2 rounded-xl"
                    />
                </button>

                <button className="cursor-pointer p-2">
                    <Image
                        src="/document.png"
                        width={64}
                        height={64}
                        alt="Document icon"
                        className="mb-2 rounded-xl"
                    />
                </button>
            </div>
    </div>
    )
}

export default AttachedMediaButton;