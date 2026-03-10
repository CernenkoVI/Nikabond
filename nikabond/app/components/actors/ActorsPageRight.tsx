import ContactButton from "../ContactButton";
import Link from "next/link";
import Image from "next/image";
import { ActorType } from "./ActorsList";

function calculateAge(dobString: string) {
    if (!dobString) return null;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }
    return age;
}

const ActorsPageRight = ({ actor }: { actor?: ActorType }) => {
    if (!actor) return null;
    const age = calculateAge(actor.dob || '');

    return (
        <div className="p-4 bg-lime-100 rounded-xl">

            <p className="my-2 "><strong>{age} yrs.</strong> {actor.dob}</p>

            <ContactButton email={actor.email} phone={actor.phone} />

            <p className="mt-3 text-sm"><strong>Citizenship</strong>: {actor.citizenship}</p>
            <p className="mb-3 text-sm"><strong>Other work permits</strong>: {actor.work_permits}</p>
            <p className="text-sm"><strong>Clothes Size</strong>: {actor.size}</p>
            <p className="text-sm"><strong>Shoe size</strong>: {actor.shoe_size}</p>
            <p className="mb-4 text-sm"><strong>Chest/waist/hip size</strong>: {actor.cwh}</p>

            {actor.agent && (
                <div className="flex items-center space-x-2">
                    <p><strong>Agent</strong>:</p>
                    <div className="mb-2 cursor-pointer p-1">
                        <Link href={`/agents/${actor.agent.id}`}>
                            <Image
                                src={actor.agent.image_url || "/agent.png"}
                                alt="Agent pic"
                                width={58}
                                height={58}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                    <p>{actor.agent.email}</p>
                </div>
            )}
        </div>
    )
}

export default ActorsPageRight;
