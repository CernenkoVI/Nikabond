'use client';

import Image from "next/image";
import Link from "next/link";
import { ActorType } from "./ActorsList";
import useActorSelection from "../hooks/useActorSelection";

interface ActorProps {
    actor: ActorType;
}

const ActorsListItem: React.FC<ActorProps> = ({ actor }) => {
    const isSelectionMode = useActorSelection((s) => s.isSelectionMode);
    const selectedActorIds = useActorSelection((s) => s.selectedActorIds);
    const toggleActor = useActorSelection((s) => s.toggleActor);
    const isSelected = selectedActorIds.includes(actor.id);

    if (isSelectionMode) {
        return (
            <div
                onClick={() => toggleActor(actor.id)}
                className={`mb-5 mx-2 cursor-pointer shadow-xl bg-lime-100 rounded-xl transition-all ${
                    isSelected ? 'ring-3 ring-lime-500' : ''
                }`}
            >
                <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image
                        fill
                        src={actor.image_url}
                        sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                        className="hover:scale-110 object-cover transition h-full w-full"
                        alt={actor.name}
                    />
                    <div className={`absolute top-2 left-2 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                        isSelected
                            ? 'bg-lime-500 border-lime-500'
                            : 'bg-white/80 border-gray-300'
                    }`}>
                        {isSelected && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="mt-2 ml-2">
                    <p className="text-lg font-bold">{actor.name}</p>
                </div>

                <div className="mb-2 ml-2">
                    <p className="text-sm line-clamp-2">{actor.description}</p>
                </div>
            </div>
        );
    }

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
    );
};

export default ActorsListItem;
