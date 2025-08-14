import Image from "next/image";
import { ActorType } from "./ActorsList";
import { useRouter } from "next/navigation";

interface ActorProps {
    actor: ActorType
}

const ActorsListItem: React.FC<ActorProps> = ({
    actor
}) => {
    const router = useRouter();

    return (
        <div
            className="mb-5 mx-2 cursor-pointer shadow-xl bg-lime-100 rounded-xl"
            onClick= {() => router.push(`/actors/${actor.id}`)} 
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={actor.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt='Le moi'
                    priority
                />
            </div>

            <div className="mt-2 ml-2">
                <p className="text-lg font-bold ">{actor.name}</p>
            </div>

            <div className="mb-2 ml-2">
                <p className="text-sm">{actor.description}</p>
            </div>
        </div>
    )
}

export default ActorsListItem;