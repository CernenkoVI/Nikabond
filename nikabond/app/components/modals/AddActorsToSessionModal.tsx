'use client';

import { useState, useEffect, useMemo } from "react";

import Modal from "./Modal";
import useAddActorsToSessionModal from "../hooks/useAddActorsToSessionModal";
import SubmitButton from "../SubmitButton";

type ActorOption = {
    id: string;
    name: string;
    image_url: string;
}

const AddActorsToSessionModal = () => {
    const [allActors, setAllActors] = useState<ActorOption[]>([]);
    const [alreadyInSession, setAlreadyInSession] = useState<Set<string>>(new Set());
    const [selectedActorIds, setSelectedActorIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const modal = useAddActorsToSessionModal();

    useEffect(() => {
        if (modal.isOpen && modal.sessionId && modal.role) {
            setSelectedActorIds([]);
            setSearchQuery('');
            setErrors([]);
            setLoading(true);

            const fetchData = async () => {
                try {
                    // Fetch all actors
                    const actorsUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/actors/`;
                    const actorsRes = await fetch(actorsUrl, { method: 'GET' });
                    const actorsJson = await actorsRes.json();
                    setAllActors(actorsJson.data || []);

                    // Fetch actors already in this session for this role
                    const sessionUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/${modal.sessionId}/actors/?role=${modal.role!.id}`;
                    const sessionRes = await fetch(sessionUrl, { method: 'GET' });
                    const sessionJson = await sessionRes.json();
                    const existingIds = new Set<string>(
                        (sessionJson.data || []).map((sa: any) => sa.actor.id)
                    );
                    setAlreadyInSession(existingIds);
                } catch {
                    setAllActors([]);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [modal.isOpen, modal.sessionId, modal.role]);

    const toggleActor = (actorId: string) => {
        setSelectedActorIds(prev =>
            prev.includes(actorId)
                ? prev.filter(id => id !== actorId)
                : [...prev, actorId]
        );
    };

    const filteredActors = useMemo(() => {
        if (!searchQuery.trim()) return allActors;
        const q = searchQuery.toLowerCase();
        return allActors.filter(a => a.name.toLowerCase().includes(q));
    }, [allActors, searchQuery]);

    const submitForm = async () => {
        setErrors([]);

        if (selectedActorIds.length === 0) {
            setErrors(['Select at least one actor.']);
            return;
        }

        const actors = selectedActorIds.map(actor_id => ({
            actor_id,
            role_id: modal.role!.id,
        }));

        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/${modal.sessionId}/actors/add/`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ actors }),
            });
            const data = await response.json();

            if (data.success) {
                if (modal.onAdded) modal.onAdded();
                modal.close();
            } else {
                setErrors(data.errors?.map((e: any) => e.error) || ['Something went wrong.']);
            }
        } catch (e) {
            setErrors(['Failed to add actors. Please try again.']);
        }
    };

    const roleName = modal.role?.name || 'Role';

    const content = (
        <>
            <h2 className="mb-4 text-xl">Add Actors for {roleName}</h2>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search actors by name..."
                className="w-full mb-3 p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                    {selectedActorIds.length} selected
                </span>
                <span className="text-xs text-gray-400">
                    {filteredActors.length} actor{filteredActors.length !== 1 ? 's' : ''}
                </span>
            </div>

            {loading ? (
                <p className="py-4 text-sm text-gray-500">Loading actors...</p>
            ) : filteredActors.length > 0 ? (
                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                    {filteredActors.map((actor) => {
                        const alreadyAdded = alreadyInSession.has(actor.id);
                        return (
                            <label
                                key={actor.id}
                                className={`flex items-center space-x-3 p-2 border rounded-xl cursor-pointer ${
                                    alreadyAdded
                                        ? 'border-lime-300 bg-lime-50 opacity-60'
                                        : 'border-gray-200 hover:bg-lime-50'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={alreadyAdded || selectedActorIds.includes(actor.id)}
                                    onChange={() => !alreadyAdded && toggleActor(actor.id)}
                                    disabled={alreadyAdded}
                                    className="w-4 h-4"
                                />
                                <img
                                    src={actor.image_url}
                                    alt={actor.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm flex-1">{actor.name}</span>
                                {alreadyAdded && (
                                    <span className="text-xs text-lime-600">already in session</span>
                                )}
                            </label>
                        );
                    })}
                </div>
            ) : (
                <p className="py-4 text-sm text-gray-400">
                    {searchQuery ? 'No actors match your search.' : 'No actors available.'}
                </p>
            )}

            {errors.length > 0 && (
                <div className="py-2">
                    {errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-500">{error}</p>
                    ))}
                </div>
            )}

            <div className="mt-4">
                <SubmitButton
                    label={`Add ${selectedActorIds.length} actor${selectedActorIds.length !== 1 ? 's' : ''}`}
                    onClick={submitForm}
                />
            </div>
        </>
    );

    return (
        <Modal
            isOpen={modal.isOpen}
            close={modal.close}
            label={`Add Actors — ${roleName}`}
            content={content}
        />
    );
};

export default AddActorsToSessionModal;
