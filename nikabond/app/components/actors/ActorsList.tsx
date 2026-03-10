'use client';

import { useEffect, useState } from 'react';
import ActorsListItem from './ActorsListItem';
import apiService from '@/app/services/apiService';
import useActorFilters from '../hooks/useActorFilters';

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
};

const ActorsList = ({ roleId }: { roleId?: string }) => {
    const [actors, setActors] = useState<ActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { appliedFilters, applyVersion } = useActorFilters();

    const getActors = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (roleId) params.set('role', roleId);
            if (appliedFilters.ethnicity.length) params.set('ethnicity', appliedFilters.ethnicity.join(','));
            if (appliedFilters.gender.length) params.set('gender', appliedFilters.gender.join(','));
            if (appliedFilters.age) {
                const range = appliedFilters.ageRange ?? 0;
                params.set('age_min', String(appliedFilters.age - range));
                params.set('age_max', String(appliedFilters.age + range));
            }
            if (appliedFilters.language) params.set('language', appliedFilters.language);
            if (appliedFilters.height) {
                const range = appliedFilters.heightRange ?? 0;
                params.set('height_min', String(appliedFilters.height - range));
                params.set('height_max', String(appliedFilters.height + range));
            }
            if (appliedFilters.haircolor) params.set('haircolor', appliedFilters.haircolor);
            if (appliedFilters.hairstyle) params.set('hairstyle', appliedFilters.hairstyle);
            if (appliedFilters.eyecolor) params.set('eyecolor', appliedFilters.eyecolor);
            if (appliedFilters.skills) params.set('skills', appliedFilters.skills);

            const queryString = params.toString();
            const url = queryString ? `/api/actors/?${queryString}` : '/api/actors/';
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
    }, [applyVersion]);

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
                return <ActorsListItem key={actor.id} actor={actor} />;
            })}
        </>
    );
};

export default ActorsList;
