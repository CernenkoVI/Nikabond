'use client';


import { useEffect, useState } from 'react';
import ActorsListItem from "./ActorsListItem";
import apiService from '@/app/services/apiService';

export type ActorType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
    info?: string;
    gender?: string;
    gender_other?: string;
    ethnicity?: string;
    height?: number;
    haircolor?: string;
    hairstyle?: string;
    eyecolor?: string;
    experience?: string;
    skills?: string;
    occupations?: string;
    licence?: string;
    languages?: string;
    country?: string;
    country_code?: string;
    dob?: string;
    phone?: string;
    email?: string;
    citizenship?: string;
    work_permits?: string;
    size?: string;
    shoe_size?: string;
    cwh?: string;
    agent?: {
        id: string;
        name: string;
        email: string;
        image_url: string;
    };
}

const ActorsList = ({ roleId }: { roleId?: string }) => {
    const [actors, setActors] = useState<ActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getActors = async () => {
        try {
            const url = roleId ? `/api/actors/?role=${roleId}` : '/api/actors/';
            const tmpActors = await apiService.get(url);
            setActors(tmpActors.data);
        } catch (e) {
            setError('Failed to load actors.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getActors();
    }, []);

    if (loading) {
        return <p className="col-span-full text-center text-gray-500 py-10">Loading actors...</p>;
    }

    if (error) {
        return <p className="col-span-full text-center text-red-500 py-10">{error}</p>;
    }

    if (actors.length === 0) {
        return <p className="col-span-full text-center text-gray-500 py-10">No actors found.</p>;
    }

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
