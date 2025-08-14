import Image from "next/image";
const ActorsListItemSmall = () => {
    return (
        <div className="w-15 h-15 cursor-pointer rounded-xl">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src='/moi.png'
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt='Le moi'
                />
            </div>
        </div>
    )
}

export default ActorsListItemSmall;