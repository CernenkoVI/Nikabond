import ActorsListItemSmall from "./ActorsListItemSmall";
const ActorsListSmall = () => {
    return (
        <div className="grid grid-flow-col auto-cols-max gap-4 min-w-1xl">
            <ActorsListItemSmall />
            <ActorsListItemSmall />
            <ActorsListItemSmall />
            <ActorsListItemSmall />
            <ActorsListItemSmall />
        </div>
    )
}

export default ActorsListSmall;