import { ActorType } from "./ActorsList";

const Field = ({ label, value, suffix }: { label: string; value?: string | number | null; suffix?: string }) => {
    if (value === null || value === undefined || value === '') return null;
    return <p><strong>{label}</strong>: {value}{suffix}</p>;
};

const ActorsPageMiddle = ({ actor }: { actor?: ActorType }) => {
    if (!actor) return null;
    return (
        <div className="flex-1 p-4 shadow-xl">
            <h1 className="text-3xl">{actor.name}</h1>
            {actor.description && <p className="mb-2 text-sm font-semibold">{actor.description}</p>}
            {actor.info && <p className="mb-2 text-sm">{actor.info}</p>}
            <Field label="Gender" value={actor.gender} />
            <Field label="Ethnicity" value={actor.ethnicity} />
            <Field label="Height" value={actor.height} suffix="cm" />
            <Field label="Hair color" value={actor.haircolor} />
            <Field label="Hairstyle" value={actor.hairstyle} />
            <div className="mb-3">
                <Field label="Eye color" value={actor.eyecolor} />
            </div>
            <Field label="Acting experience" value={actor.experience} />
            <Field label="Skills" value={actor.skills} />
            <Field label="Other occupations" value={actor.occupations} />
            <div className="mb-3">
                <Field label="Driver's licence" value={actor.licence} />
            </div>
            <Field label="Languages" value={actor.languages} />
            <Field label="Country of residence" value={actor.country} />
        </div>
    )
}

export default ActorsPageMiddle;
