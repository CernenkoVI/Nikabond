'use client';

import { useEffect, useState, useCallback } from 'react';
import ActorsListItem from '../actors/ActorsListItem';
import useAssignActorsModal from '../hooks/useAssignActorsModal';
import { ActorType } from '../actors/ActorsList';

const RoleActorsSection = ({ roleId }: { roleId: string }) => {
    const [actors, setActors] = useState<ActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const assignActorsModal = useAssignActorsModal();

    const fetchActors = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/actors/?role=${roleId}`;
            const res = await fetch(url, { method: 'GET' });
            const json = await res.json();
            setActors(json.data || []);
            setError(null);
        } catch (e) {
            setError('Failed to load actors.');
        } finally {
            setLoading(false);
        }
    }, [roleId]);

    useEffect(() => {
        fetchActors();
    }, [fetchActors]);

    return (
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <div className="m-2 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Actors selection</h1>
                <button
                    onClick={() => assignActorsModal.open(roleId, fetchActors)}
                    className="w-8 h-8 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 text-lg font-bold"
                >
                    +
                </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500 py-10">Loading actors...</p>
                ) : error ? (
                    <p className="col-span-full text-center text-red-500 py-10">{error}</p>
                ) : actors.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-10">No actors assigned.</p>
                ) : (
                    actors.map((actor) => (
                        <ActorsListItem key={actor.id} actor={actor} />
                    ))
                )}
            </div>
        </div>
    );
};

export default RoleActorsSection;
