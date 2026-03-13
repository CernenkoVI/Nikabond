'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import StatusBadge from '../StatusBadge';

type ActorType = {
    id: string;
    name: string;
    image_url: string;
}

type SessionEntry = {
    session_id: string;
    session_title: string;
    outcome: string;
    time_slot: string | null;
}

type PipelineActor = {
    actor: ActorType;
    has_confirmed: boolean;
    sessions: SessionEntry[];
}

const RoleActorsFromSessions = ({ roleId }: { roleId: string }) => {
    const [actors, setActors] = useState<PipelineActor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const fetchPipeline = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/${roleId}/pipeline/?all=${showAll}`;
            const res = await fetch(url, { method: 'GET' });
            const json = await res.json();
            setActors(json.actors || []);
        } catch (e) {
            console.log('Failed to load pipeline', e);
        } finally {
            setLoading(false);
        }
    }, [roleId, showAll]);

    useEffect(() => {
        fetchPipeline();
    }, [fetchPipeline]);

    return (
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <div className="m-2 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Actors</h1>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm font-medium text-lime-700 hover:text-lime-800 cursor-pointer"
                >
                    {showAll ? 'Show confirmed only' : 'Show all participants'}
                </button>
            </div>

            <p className="mx-2 mb-4 text-xs text-gray-400">
                {showAll
                    ? 'Showing all actors who participated in any session for this role.'
                    : 'Showing actors confirmed or completed in at least one session.'}
            </p>

            {loading ? (
                <p className="mx-2 text-center text-gray-500 py-10">Loading actors...</p>
            ) : actors.length === 0 ? (
                <p className="mx-2 text-center text-gray-500 py-10">
                    {showAll
                        ? 'No actors have been added to sessions for this role yet.'
                        : 'No confirmed actors yet. Add actors to sessions and mark them as confirmed.'}
                </p>
            ) : (
                <div className="mx-2 space-y-2">
                    {actors.map((entry) => (
                        <div key={entry.actor.id} className="p-3 bg-white rounded-xl border border-gray-200 hover:border-lime-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Link href={`/actors/${entry.actor.id}`}>
                                        <img
                                            src={entry.actor.image_url}
                                            alt={entry.actor.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </Link>
                                    <Link href={`/actors/${entry.actor.id}`} className="text-sm font-medium hover:text-lime-700">
                                        {entry.actor.name}
                                    </Link>
                                </div>
                            </div>

                            {entry.sessions.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {entry.sessions.map((s) => (
                                        <Link key={s.session_id} href={`/sessions/${s.session_id}`}>
                                            <span className="inline-flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 hover:bg-lime-100 cursor-pointer">
                                                <span>{s.session_title}</span>
                                                <StatusBadge status={s.outcome} />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoleActorsFromSessions;
