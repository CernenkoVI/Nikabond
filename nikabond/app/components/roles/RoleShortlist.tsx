'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import StatusBadge from '../StatusBadge';
import useAssignActorsModal from '../hooks/useAssignActorsModal';

type ActorType = {
    id: string;
    name: string;
    image_url: string;
}

type RoleActorType = {
    id: string;
    actor: ActorType;
    status: string;
    notes: string;
    added_at: string;
}

const STATUS_FILTERS = ['all', 'shortlisted', 'callback', 'on_hold', 'cast', 'passed'];

const RoleShortlist = ({ roleId }: { roleId: string }) => {
    const [roleActors, setRoleActors] = useState<RoleActorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const assignActorsModal = useAssignActorsModal();

    const fetchShortlist = useCallback(async () => {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/${roleId}/shortlist/`;
            const res = await fetch(url, { method: 'GET' });
            const json = await res.json();
            setRoleActors(json.data || []);
        } catch (e) {
            console.log('Failed to load shortlist', e);
        } finally {
            setLoading(false);
        }
    }, [roleId]);

    useEffect(() => {
        fetchShortlist();
    }, [fetchShortlist]);

    const updateStatus = async (ra: RoleActorType, newStatus: string) => {
        setUpdatingId(ra.id);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/${roleId}/shortlist/${ra.actor.id}/`;
            await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            setRoleActors(prev =>
                prev.map(item => item.id === ra.id ? { ...item, status: newStatus } : item)
            );
        } catch (e) {
            console.log('Failed to update status', e);
        } finally {
            setUpdatingId(null);
        }
    };

    const removeActor = async (ra: RoleActorType) => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/${roleId}/shortlist/${ra.actor.id}/remove/`;
            await fetch(url, { method: 'DELETE' });
            setRoleActors(prev => prev.filter(item => item.id !== ra.id));
        } catch (e) {
            console.log('Failed to remove actor', e);
        }
    };

    const filteredActors = activeFilter === 'all'
        ? roleActors
        : roleActors.filter(ra => ra.status === activeFilter);

    const statuses = ['shortlisted', 'callback', 'on_hold', 'cast', 'passed'];

    return (
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
            <div className="m-2 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Shortlist</h1>
                <button
                    onClick={() => assignActorsModal.open(roleId, fetchShortlist)}
                    className="w-8 h-8 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            </div>

            {/* Status filter tabs */}
            <div className="mx-2 mb-4 flex flex-wrap gap-1">
                {STATUS_FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 text-xs rounded-full cursor-pointer transition ${
                            activeFilter === filter
                                ? 'bg-lime-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {filter === 'all' ? `All (${roleActors.length})` : `${filter.replace('_', ' ')} (${roleActors.filter(r => r.status === filter).length})`}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="mx-2 text-center text-gray-500 py-10">Loading shortlist...</p>
            ) : filteredActors.length === 0 ? (
                <p className="mx-2 text-center text-gray-500 py-10">
                    {roleActors.length === 0 ? 'No actors on the shortlist yet.' : 'No actors match this filter.'}
                </p>
            ) : (
                <div className="mx-2 space-y-2">
                    {filteredActors.map((ra) => (
                        <div key={ra.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-lime-300">
                            <div className="flex items-center space-x-3">
                                <Link href={`/actors/${ra.actor.id}`}>
                                    <img
                                        src={ra.actor.image_url}
                                        alt={ra.actor.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </Link>
                                <Link href={`/actors/${ra.actor.id}`} className="text-sm font-medium hover:text-lime-700">
                                    {ra.actor.name}
                                </Link>
                            </div>

                            <div className="flex items-center space-x-2">
                                <select
                                    value={ra.status}
                                    onChange={(e) => updateStatus(ra, e.target.value)}
                                    disabled={updatingId === ra.id}
                                    className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-lime-500"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeActor(ra)}
                                    className="text-gray-300 hover:text-red-500 text-sm cursor-pointer"
                                    title="Remove from shortlist"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoleShortlist;
