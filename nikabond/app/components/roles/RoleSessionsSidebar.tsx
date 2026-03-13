'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatusBadge from '../StatusBadge';
import useAddSessionModal from '../hooks/useAddSessionModal';

type RoleType = {
    id: string;
    name: string;
}

type SessionType = {
    id: string;
    title: string;
    scheduled_at: string | null;
    status: string;
    actor_count: number;
    roles: RoleType[];
    // Legacy
    name?: string;
}

const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'No date';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
        return dateStr;
    }
};

const RoleSessionsSidebar = ({ roleId, projectId }: { roleId: string; projectId: string }) => {
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const addSessionModal = useAddSessionModal();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/?project=${projectId}`;
                const res = await fetch(url, { method: 'GET' });
                const json = await res.json();
                // Filter to sessions that include this role
                const allSessions: SessionType[] = json.data || [];
                const roleSessions = allSessions.filter(s =>
                    s.roles?.some(r => r.id === roleId)
                );
                setSessions(roleSessions);
            } catch (e) {
                console.log('Failed to fetch sessions', e);
            }
        };
        if (projectId) fetchSessions();
    }, [roleId, projectId]);

    return (
        <div className="mt-4 w-full">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Sessions</p>
                <button
                    onClick={() => addSessionModal.open(projectId)}
                    className="w-6 h-6 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 text-sm font-bold"
                >
                    +
                </button>
            </div>
            {sessions.length > 0 ? (
                <div className="space-y-2">
                    {sessions.map((session) => (
                        <Link key={session.id} href={`/sessions/${session.id}`}>
                            <div className="p-2 bg-white rounded-lg hover:bg-lime-50 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-medium">{session.title || session.name}</p>
                                    <StatusBadge status={session.status || 'draft'} />
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {formatDateTime(session.scheduled_at)}
                                    {session.actor_count > 0 && ` · ${session.actor_count} actors`}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-gray-400">No sessions yet.</p>
            )}
        </div>
    );
};

export default RoleSessionsSidebar;
