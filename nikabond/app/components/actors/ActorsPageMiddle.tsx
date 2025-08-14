import apiService from "@/app/services/apiService";

const ActorsPageMiddle = async ({params}: {params: {id: string}}) => {
    const actor = await apiService.get(`/api/actors/${params.id}`)

    return (
        <div className="flex-1 p-4 shadow-xl">
            <h1 className="text-3xl">{actor.name}</h1>
            <p className="mb-2 text-sm font-semibold">{actor.description}</p>
            <p className="mb-2 text-sm">{actor.info}</p>
            <p><strong>Gender</strong>: {actor.gender}</p>
            <p ><strong>Ethnicity</strong>: {actor.ethnicity}</p>
            <p><strong>Height</strong>: {actor.height}cm</p>
            <p><strong>Hair color</strong>: {actor.haircolor}</p>
            <p><strong>Hairstyle</strong>: {actor.hairstyle}</p>
            <p className="mb-3"><strong>Eye color</strong>: {actor.eyecolor}</p>
            <p><strong>Acting experience</strong>: {actor.experience}</p>
            <p><strong>Skills</strong>: {actor.skills}</p>
            <p><strong>Other occupations</strong>: {actor.occupations}</p>
            <p className="mb-3"><strong>Driver's licence</strong>: {actor.licence}</p>
            <p><strong>Languages</strong>: {actor.languages}</p>
            <p><strong>Country of residence</strong>: {actor.country}</p>
        </div>
    )
}

export default ActorsPageMiddle;