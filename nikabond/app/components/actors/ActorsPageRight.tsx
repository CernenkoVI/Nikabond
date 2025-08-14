import ContactButton from "../ContactButton";
import Link from "next/link";

import apiService from "@/app/services/apiService";


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


const ActorsPageRight = async ({params}: {params: {id: string}}) => {
    const actor = await apiService.get(`/api/actors/${params.id}`);
    const age = calculateAge(actor.dob);

    return (
        <div className="p-4 bg-lime-100 rounded-xl">
            <div className="flex items-center space-x-2">
                <p><strong>Agent</strong>:</p>
                <div className="mb-2 cursor-pointer p-1">
                    <Link href="/agents/1">
                        <img
                            src="/agent.png"
                            alt="Agent pic"
                            className="w-[58px] h-[58px] min-w-[58px] rounded-full"
                        />
                    </Link>
                </div>
                <p>{actor.agent.email}</p>
            </div>
            <p className="mb-2 "><strong>{age} yrs.</strong> {actor.dob}</p>

            <ContactButton params={params} />

            <p className="mt-3 text-sm"><strong>Citizenship</strong>: {actor.citizenship}</p>
            <p className="mb-3 text-sm"><strong>Other work permits</strong>: </p>
            <p className="text-sm"><strong>Clothes Size</strong>: 32/34</p>
            <p className="text-sm"><strong>Shoe size</strong>: EUR 44</p>
            <p className="mb-4 text-sm"><strong>Chest/waist/hip size</strong>: 90/60/90</p>
        </div>
    )
}

export default ActorsPageRight;