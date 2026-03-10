import Image from "next/image";
import Link from "next/link";
import { ActorType } from "./ActorsList";

interface ActorProps {
    actor: ActorType
}

const ActorsListItem: React.FC<ActorProps> = ({
    actor
}) => {
    return (
        <Link
            href={`/actors/${actor.id}`}
            className="mb-5 mx-2 cursor-pointer shadow-xl bg-lime-100 rounded-xl"
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={actor.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={actor.name}
                />
            </div>

            <div className="mt-2 ml-2">
                <p className="text-lg font-bold ">{actor.name}</p>
            </div>

            <div className="mb-2 ml-2">
                <p className="text-sm line-clamp-2">{actor.description}</p>
            </div>
        </Link>
    )
}

export default ActorsListItem;
