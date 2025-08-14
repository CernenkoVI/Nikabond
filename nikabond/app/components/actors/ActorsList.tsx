'use client';


import { useEffect, useState } from 'react';
import ActorsListItem from "./ActorsListItem";
import apiService from '@/app/services/apiService';

export type ActorType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

const ActorsList = () => {
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
                    <ActorsListItem
                        key={actor.id}
                        actor={actor}
                    />
                )
            })}            
        </>
    )
}

export default ActorsList;