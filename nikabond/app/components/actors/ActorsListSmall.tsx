

'use client';


import { useEffect, useState } from 'react';
import ActorsListItemSmall from "./ActorsListItemSmall";
import apiService from '@/app/services/apiService';
import { ActorType } from "./ActorsList";

const ActorsListSmall = () => {
    const [actors, setActors] = useState<ActorType[]>([]);

    const getActors = async () => {
        const tmpActors = await apiService.get('/api/actors/')

        setActors(tmpActors.data);
    };

    useEffect(() => {
        getActors();
    }, []);

    return (
        <>
            {actors.map((actor) => {
                return(
                    <ActorsListItemSmall
                        key={actor.id}
                        actor={actor}
                    />
                )
            })}            
        </>
    )
}

export default ActorsListSmall;