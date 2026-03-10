import Image from "next/image";
import Link from "next/link";
import { ActorType } from "./ActorsList";

interface ActorSmallProps {
    actor: ActorType;
}

const ActorsListItemSmall: React.FC<ActorSmallProps> = ({ actor }) => {
    return (
        <Link href={`/actors/${actor.id}`} className="w-15 h-15 cursor-pointer rounded-xl">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={actor.image_url}
                    sizes="60px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={actor.name}
                />
            </div>
        </Link>
    )
}

export default ActorsListItemSmall;
