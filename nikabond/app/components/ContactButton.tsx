import Image from "next/image";

interface ContactButtonProps {
    email?: string;
    phone?: string;
}

const ContactButton = ({ email, phone }: ContactButtonProps) => {
    return (
        <div className="mb-2 font-semibold">
            <p>{email}</p>
            <p>{phone}</p>


            <div className="items-center grid grid-cols-8 rounded-full">
                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/telegram.png'
                        className="object-contain"
                        alt="telegram icon"
                        fill
                        sizes="50px"
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/whatsapp.png'
                        className="object-contain"
                        alt="whatsapp icon"
                        fill
                        sizes="50px"
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
                        sizes="50px"
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/tiktok.png'
                        alt="tiktok icon"
                        className="object-contain"
                        fill
                        sizes="50px"
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/instagram.png'
                        alt="instagram icon"
                        className="object-contain"
                        fill
                        sizes="50px"
                    />
                </div>

                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/youtube.png'
                        alt="youtube icon"
                        className="object-contain"
                        fill
                        sizes="50px"
                    />
                </div>
                <div className="cursor-pointer items-center relative w-9 h-9 hover:bg-lime-200">
                    <Image
                        src='/linkedin.png'
                        alt="linkedin icon"
                        className="object-contain"
                        fill
                        sizes="50px"
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactButton;
