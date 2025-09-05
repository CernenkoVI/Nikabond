

'use client';


import { useEffect, useState } from 'react';
import ActorsListItemSmall from "./ActorsListItem";
import apiService from '@/app/services/apiService';

export type ActorType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

const ActorsListSmall = () => {
    const [actors, setActors] = useState<ActorType[]>([]);

    const getActors = async () => {
        const tmpActors = await apiService.get('/api/actors/')

        setActors(tmpActors.data);
    };

    useEffect(() => {
        apiService.get('/api/actors/');
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