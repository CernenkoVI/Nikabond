'use client';

import { useState, useEffect } from "react";

import Modal from "./Modal";
import useAssignActorsModal from "../hooks/useAssignActorsModal";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

type ActorOption = {
    id: string;
    name: string;
    image_url: string;
}

const AssignActorsModal = () => {
    const [allActors, setAllActors] = useState<ActorOption[]>([]);
    const [selectedActors, setSelectedActors] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const assignActorsModal = useAssignActorsModal();

    // Fetch all actors and pre-select those already assigned to this role
    useEffect(() => {
        if (assignActorsModal.isOpen && assignActorsModal.roleId) {
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

    const content = (
        <>
            <h2 className="mb-4 text-xl">Select Actors</h2>

            {loading ? (
                <p className="py-4 text-sm text-gray-500">Loading actors...</p>
            ) : allActors.length > 0 ? (
                <div className="py-2 space-y-2 max-h-[400px] overflow-y-auto">
                    {allActors.map((actor) => (
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
                <p className="py-4 text-sm text-gray-500">No actors available.</p>
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
