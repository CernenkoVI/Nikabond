import Image from "next/image";
import apiService from "@/app/services/apiService";

const ContactButton = async ({params}: {params: {id: string}}) => {
    const actor = await apiService.get(`/api/actors/${params.id}`)

    return (
        <div className="mb-2 font-semibold">
            <p>{actor.email}</p>
            <p>{actor.phone}</p>


            <div className="items-center grid grid-cols-8 rounded-full">
                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/telegram.png'
                        className="object-contain"
                        alt="telegram icon"
                        fill
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/whatsapp.png'
                        className="object-contain"
                        alt="whatsapp icon"
                        fill
                    />
                </div>
            </div>


            <div className="items-center grid grid-cols-8">
                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/facebook.png'
                        className="object-contain"
                        alt="facebook icon"
                        fill
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/tiktok.png'
                        alt="tiktok icon"
                        className="object-contain"
                        fill
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/instagram.png'
                        alt="instagram icon"
                        className="object-contain"
                        fill
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/youtube.png'
                        alt="youtube icon"
                        className="object-contain"
                        fill
                    />
                </div>
                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/linkedin.png'
                        alt="linkedin icon"
                        className="object-contain"
                        fill
                    />
                </div>
            </div>            
        </div>
    )
}

export default ContactButton;