'use client';

import { useEffect, useState } from 'react';
import ActorsListItem from './ActorsListItem';
import apiService from '@/app/services/apiService';
import useActorFilters from '../hooks/useActorFilters';
import useActorSelection from '../hooks/useActorSelection';

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

const ITEMS_PER_PAGE = 14;

const ActorsList = ({ roleId }: { roleId?: string }) => {
    const [actors, setActors] = useState<ActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const { appliedFilters, nameQuery, applyVersion } = useActorFilters();
    const { isSelectionMode, selectedActorIds, selectAll, deselectAll } = useActorSelection();

    const totalPages = Math.ceil(actors.length / ITEMS_PER_PAGE);
    const paginatedActors = actors.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    const pageActorIds = paginatedActors.map((a) => a.id);
    const allPageSelected = pageActorIds.length > 0 && pageActorIds.every((id) => selectedActorIds.includes(id));

    const getActors = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (roleId) params.set('role', roleId);
            if (nameQuery) params.set('name', nameQuery);
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
            setPage(1);
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
            {isSelectionMode && (
                <div className="col-span-full flex items-center gap-3 pb-2">
                    <button
                        onClick={() => allPageSelected ? deselectAll() : selectAll(pageActorIds)}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium bg-lime-100 hover:bg-lime-200 transition-colors"
                    >
                        {allPageSelected ? 'Deselect all' : 'Select all on page'}
                    </button>
                    {selectedActorIds.length > 0 && (
                        <span className="text-sm text-gray-600">
                            {selectedActorIds.length} selected
                        </span>
                    )}
                </div>
            )}

            {paginatedActors.map((actor) => {
                return <ActorsListItem key={actor.id} actor={actor} />;
            })}

            {totalPages > 1 && (
                <div className="col-span-full flex items-center justify-center gap-2 pt-6 pb-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-lime-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                p === page
                                    ? 'bg-lime-100'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-lime-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default ActorsList;
