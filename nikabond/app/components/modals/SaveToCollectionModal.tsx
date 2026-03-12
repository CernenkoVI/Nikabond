'use client';

import { useState, useEffect } from "react";

import Modal from "./Modal";
import SubmitButton from "../SubmitButton";
import useSaveToCollectionModal from "../hooks/useSaveToCollectionModal";
import useActorSelection from "../hooks/useActorSelection";
import apiService from "@/app/services/apiService";

type CollectionOption = {
    id: string;
    name: string;
    actors_count: number;
};

const SaveToCollectionModal = () => {
    const [collections, setCollections] = useState<CollectionOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [mode, setMode] = useState<'select' | 'create'>('select');
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const saveModal = useSaveToCollectionModal();
    const exitSelectionMode = useActorSelection((s) => s.exitSelectionMode);

    useEffect(() => {
        if (saveModal.isOpen) {
            setMode('select');
            setNewName('');
            setNewDescription('');
            setErrors([]);
            fetchCollections();
        }
    }, [saveModal.isOpen]);

    const fetchCollections = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('/api/collections/');
            setCollections(res.data || []);
        } catch {
            setCollections([]);
        } finally {
            setLoading(false);
        }
    };

    const addToExisting = async (collectionId: string) => {
        setErrors([]);
        const formData = new FormData();
        saveModal.actorIds.forEach((id) => formData.append('actors', id));

        try {
            const response = await apiService.post(
                `/api/collections/${collectionId}/add-actors/`,
                formData
            );
            if (response.success) {
                saveModal.close();
                exitSelectionMode();
            }
        } catch {
            setErrors(['Failed to add actors. Please try again.']);
        }
    };

    const createAndAdd = async () => {
        setErrors([]);
        if (!newName.trim()) {
            setErrors(['Collection name is required.']);
            return;
        }

        const formData = new FormData();
        formData.append('name', newName.trim());
        formData.append('description', newDescription.trim());
        saveModal.actorIds.forEach((id) => formData.append('actors', id));

        try {
            const response = await apiService.post('/api/collections/create/', formData);
            if (response.success) {
                saveModal.close();
                exitSelectionMode();
            }
        } catch {
            setErrors(['Failed to create collection. Please try again.']);
        }
    };

    const content = (
        <>
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setMode('select')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mode === 'select'
                            ? 'bg-lime-500/75 text-black'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                >
                    Existing Collection
                </button>
                <button
                    onClick={() => setMode('create')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mode === 'create'
                            ? 'bg-lime-500/75 text-black'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                >
                    New Collection
                </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                {saveModal.actorIds.length} actor{saveModal.actorIds.length !== 1 ? 's' : ''} selected
            </p>

            {mode === 'select' && (
                <>
                    {loading ? (
                        <p className="py-4 text-sm text-gray-500">Loading collections...</p>
                    ) : collections.length > 0 ? (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {collections.map((collection) => (
                                <div
                                    key={collection.id}
                                    onClick={() => addToExisting(collection.id)}
                                    className="flex items-center justify-between p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-lime-50 transition-colors"
                                >
                                    <div>
                                        <p className="text-sm font-medium">{collection.name}</p>
                                        <p className="text-xs text-gray-500">{collection.actors_count} actors</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-4 text-sm text-gray-500">No collections yet. Create one!</p>
                    )}
                </>
            )}

            {mode === 'create' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            placeholder="My Collection"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            rows={3}
                            placeholder="A short description..."
                        />
                    </div>
                    <SubmitButton
                        label="Create & Save"
                        onClick={createAndAdd}
                    />
                </div>
            )}

            {errors.length > 0 && (
                <div className="py-2">
                    {errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-500">{error}</p>
                    ))}
                </div>
            )}
        </>
    );

    return (
        <Modal
            isOpen={saveModal.isOpen}
            close={saveModal.close}
            label="Save to Collection"
            content={content}
        />
    );
};

export default SaveToCollectionModal;
