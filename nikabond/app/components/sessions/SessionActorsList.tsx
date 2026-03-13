'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import useAddActorsToSessionModal from '../hooks/useAddActorsToSessionModal';

type RoleType = {
    id: string;
    name: string;
    image_url: string;
    project_id: string;
}

type ActorType = {
    id: string;
    name: string;
    image_url: string;
}

type SessionActorType = {
    id: string;
    actor: ActorType;
    role: RoleType;
    outcome: string;
    time_slot: string | null;
    notes: string;
}

interface SessionActorsListProps {
    sessionId: string;
    roles: RoleType[];
}

const SessionActorsList = ({ sessionId, roles }: SessionActorsListProps) => {
    const [sessionActors, setSessionActors] = useState<SessionActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const addActorsModal = useAddActorsToSessionModal();

    const fetchSessionActors = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/${sessionId}/actors/`;
            const res = await fetch(url, { method: 'GET' });
            const json = await res.json();
            setSessionActors(json.data || []);
        } catch (e) {
            console.log('Failed to load session actors', e);
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    useEffect(() => {
        fetchSessionActors();
    }, [fetchSessionActors]);

    const updateOutcome = async (sa: SessionActorType, newOutcome: string) => {
        setUpdatingId(sa.id);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/${sessionId}/actors/${sa.actor.id}/`;
            await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: sa.role.id, outcome: newOutcome }),
            });
            setSessionActors(prev =>
                prev.map(item => item.id === sa.id ? { ...item, outcome: newOutcome } : item)
            );
        } catch (e) {
            console.log('Failed to update outcome', e);
        } finally {
            setUpdatingId(null);
        }
    };

    const removeActor = async (sa: SessionActorType) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/${sessionId}/actors/${sa.actor.id}/remove/?role=${sa.role.id}`;
            await fetch(url, { method: 'DELETE' });
            setSessionActors(prev => prev.filter(item => item.id !== sa.id));
        } catch (e) {
            console.log('Failed to remove actor', e);
        }
    };

    // Group actors by role
    const actorsByRole = roles.map(role => ({
        role,
        actors: sessionActors.filter(sa => sa.role.id === role.id),
    }));

    const outcomes = ['scheduled', 'confirmed', 'completed', 'no_show', 'cancelled'];

    if (loading) {
        return <p className="text-center text-gray-500 py-10">Loading actors...</p>;
    }

    return (
        <div>
            <h1 className="m-2 text-2xl font-semibold">Actors</h1>

            {actorsByRole.map(({ role, actors }) => (
                <div key={role.id} className="mb-6">
                    <div className="m-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Link href={`/roles/${role.id}`} className="text-lg font-semibold hover:text-lime-700">
                                {role.name}
                            </Link>
                            <span className="text-sm text-gray-500">({actors.length} actor{actors.length !== 1 ? 's' : ''})</span>
                        </div>
                        <button
                            onClick={() => addActorsModal.open(sessionId, role, fetchSessionActors)}
                            className="w-7 h-7 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 text-sm font-bold"
                        >
                            +
                        </button>
                    </div>

                    {actors.length > 0 ? (
                        <div className="space-y-2 mx-2">
                            {actors.map((sa) => (
                                <div key={sa.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-lime-300">
                                    <div className="flex items-center space-x-3">
                                        <Link href={`/actors/${sa.actor.id}`}>
                                            <img
                                                src={sa.actor.image_url}
                                                alt={sa.actor.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </Link>
                                        <div>
                                            <Link href={`/actors/${sa.actor.id}`} className="text-sm font-medium hover:text-lime-700">
                                                {sa.actor.name}
                                            </Link>
                                            {sa.time_slot && (
                                                <p className="text-xs text-gray-500">
                                                    {format(new Date(sa.time_slot), 'h:mm a')}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={sa.outcome}
                                            onChange={(e) => updateOutcome(sa, e.target.value)}
                                            disabled={updatingId === sa.id}
                                            className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-lime-500"
                                        >
                                            {outcomes.map((o) => (
                                                <option key={o} value={o}>{o.replace('_', ' ')}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => removeActor(sa)}
                                            className="text-gray-300 hover:text-red-500 text-sm cursor-pointer"
                                            title="Remove from session"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mx-2 text-sm text-gray-500">No actors added for this role.</p>
                    )}
                </div>
            ))}

            {roles.length === 0 && (
                <p className="m-2 text-sm text-gray-500">No roles assigned to this session. Add roles first.</p>
            )}
        </div>
    );
};

export default SessionActorsList;
