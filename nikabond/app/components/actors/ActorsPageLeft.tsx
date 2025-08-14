import Image from "next/image";

import apiService from "@/app/services/apiService";

const ActorsPageLeft = async ({params}: {params: {id: string}}) => {
    const actor = await apiService.get(`/api/actors/${params.id}`)

    return (
        <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            {/* Left Column: Image */}
            <div className="flex flex-col items-center w-full lg:w-[48vh]">
                {/* Image Container */}
                <div className="w-full h-[64vh] overflow-hidden rounded-xl relative">
                    <Image
                        fill
                        src={actor?.image_url}
                        className="object-cover w-full h-full"
                        alt="beautiful face"
                    />
                </div>

                {/* Icons underneath */}
                <div className="mt-4 flex space-x-6 justify-center">
                    <button className="cursor-pointer text-lime-500 p-4 hover:text-lime-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[4.5rem] h-[4.5rem]">
                            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                            <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button className="cursor-pointer text-lime-500 p-4 hover:text-lime-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[4.5rem] h-[4.5rem]">
                            <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                        </svg>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default ActorsPageLeft;