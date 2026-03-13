'use client';

import { useState, useEffect } from "react";

import Modal from "./Modal";
import useAssignActorsModal from "../hooks/useAssignActorsModal";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";
import { getAccessToken } from "@/app/lib/actions";

type ActorOption = {
    id: string;
    name: string;
    image_url: string;
}

type CollectionOption = {
    id: string;
    name: string;
    actors_count: number;
}

const AssignActorsModal = () => {
    const [allActors, setAllActors] = useState<ActorOption[]>([]);
    const [selectedActors, setSelectedActors] = useState<string[]>([]);
    const [collections, setCollections] = useState<CollectionOption[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAllActors, setShowAllActors] = useState(false);

    const assignActorsModal = useAssignActorsModal();

    useEffect(() => {
        if (assignActorsModal.isOpen && assignActorsModal.roleId) {
            setShowAllActors(false);
            const fetchData = async () => {
                setLoading(true);
                try {
                    const allUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/actors/`;
                    const allRes = await fetch(allUrl, { method: 'GET' });
                    const allJson = await allRes.json();
                    setAllActors(allJson.data || []);

                    const roleUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/actors/?role=${assignActorsModal.roleId}`;
                    const roleRes = await fetch(roleUrl, { method: 'GET' });
                    const roleJson = await roleRes.json();
                    const assignedIds = (roleJson.data || []).map((a: ActorOption) => a.id);
                    setSelectedActors(assignedIds);

                    const token = await getAccessToken();
                    if (token) {
                        try {
                            const colRes = await apiService.get('/api/collections/');
                            setCollections(colRes.data || []);
                        } catch {
                            setCollections([]);
                        }
                    }
                } catch (error) {
                    console.log('Failed to fetch actors', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [assignActorsModal.isOpen, assignActorsModal.roleId]);

    const toggleActor = (actorId: string) => {
        setSelectedActors(prev =>
            prev.includes(actorId)
                ? prev.filter(id => id !== actorId)
                : [...prev, actorId]
        );
    };

    const addFromCollection = async (collectionId: string) => {
        try {
            const data = await apiService.get(`/api/collections/${collectionId}/`);
            const actorIds: string[] = (data.actors || []).map((a: ActorOption) => a.id);
            setSelectedActors(prev => {
                const merged = new Set([...prev, ...actorIds]);
                return Array.from(merged);
            });
        } catch {
            console.log('Failed to fetch collection actors');
        }
    };

    const submitForm = async () => {
        setErrors([]);

        const formData = new FormData();
        selectedActors.forEach(actorId => {
            formData.append('actors', actorId);
        });

        try {
            const response = await apiService.postWithoutToken(
                `/api/roles/${assignActorsModal.roleId}/actors/`,
                formData
            );

            if (response.success) {
                if (assignActorsModal.onUpdated) {
                    assignActorsModal.onUpdated();
                }
                assignActorsModal.close();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update actors. Please check your connection and try again.']);
        }
    };

    const assignedActors = allActors.filter(a => selectedActors.includes(a.id));
    const displayedActors = showAllActors ? allActors : assignedActors;

    const content = (
        <>
            {!loading && collections.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add from Collection</label>
                    <select
                        defaultValue=""
                        onChange={(e) => {
                            if (e.target.value) {
                                addFromCollection(e.target.value);
                                e.target.value = '';
                            }
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 bg-white"
                    >
                        <option value="" disabled>Select a collection...</option>
                        {collections.map((col) => (
                            <option key={col.id} value={col.id}>
                                {col.name} ({col.actors_count} actors)
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                    {selectedActors.length} actor{selectedActors.length !== 1 ? 's' : ''} assigned
                </span>
                <button
                    onClick={() => setShowAllActors(!showAllActors)}
                    className="text-sm font-medium text-lime-700 hover:text-lime-800"
                >
                    {showAllActors ? 'Show assigned only' : 'Show all actors'}
                </button>
            </div>

            {loading ? (
                <p className="py-4 text-sm text-gray-500">Loading actors...</p>
            ) : displayedActors.length > 0 ? (
                <div className="py-2 space-y-2 max-h-[400px] overflow-y-auto">
                    {displayedActors.map((actor) => (
                        <label
                            key={actor.id}
                            className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-lime-50"
                        >
                            <input
                                type="checkbox"
                                checked={selectedActors.includes(actor.id)}
                                onChange={() => toggleActor(actor.id)}
                                className="w-5 h-5"
                            />
                            <img
                                src={actor.image_url}
                                alt={actor.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium">{actor.name}</span>
                        </label>
                    ))}
                </div>
            ) : (
                <p className="py-4 text-sm text-gray-500">
                    {showAllActors ? 'No actors available.' : 'No actors assigned yet.'}
                </p>
            )}

            {errors.length > 0 && (
                <div className="py-2">
                    {errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-500">{error}</p>
                    ))}
                </div>
            )}

            <SubmitButton
                label="Save"
                onClick={submitForm}
            />
        </>
    );

    return (
        <Modal
            isOpen={assignActorsModal.isOpen}
            close={assignActorsModal.close}
            label="Assign Actors to Role"
            content={content}
        />
    );
};

export default AssignActorsModal;
