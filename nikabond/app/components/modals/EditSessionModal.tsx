'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useEditSessionModal from "../hooks/useEditSessionModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

type ProjectOption = {
    id: string;
    name: string;
}

type RoleOption = {
    id: string;
    name: string;
}

const EditSessionModal = () => {
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataProject, setDataProject] = useState('');
    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [roles, setRoles] = useState<RoleOption[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const editSessionModal = useEditSessionModal();
    const router = useRouter();

    useEffect(() => {
        if (editSessionModal.isOpen && editSessionModal.entityData) {
            const d = editSessionModal.entityData;
            setDataName(d.name || '');
            setDataDescription(d.description || '');
            setDataProject(d.project?.id || '');
            setDataStart(d.start || '');
            setDataEnd(d.end || '');
            setSelectedRoles(d.roles ? d.roles.map((r: any) => r.id) : []);
            setCurrentStep(1);
            setErrors([]);

            const fetchProjects = async () => {
                try {
                    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/`;
                    const response = await fetch(url, { method: 'GET' });
                    const json = await response.json();
                    setProjects(json.data || []);
                } catch (error) {
                    console.log('Failed to fetch projects', error);
                }
            };
            fetchProjects();
        }
    }, [editSessionModal.isOpen, editSessionModal.entityData]);

    // Fetch roles when project changes
    useEffect(() => {
        if (dataProject) {
            const fetchRoles = async () => {
                try {
                    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/?project=${dataProject}`;
                    const response = await fetch(url, { method: 'GET' });
                    const json = await response.json();
                    setRoles(json.data || []);
                } catch (error) {
                    console.log('Failed to fetch roles', error);
                }
            };
            fetchRoles();
        } else {
            setRoles([]);
            setSelectedRoles([]);
        }
    }, [dataProject]);

    const toggleRole = (roleId: string) => {
        setSelectedRoles(prev =>
            prev.includes(roleId)
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const submitForm = async () => {
        setErrors([]);

        const validationErrors: string[] = [];
        if (!dataName) validationErrors.push('Session name is required.');
        if (!dataProject) validationErrors.push('Project is required.');
        if (!dataStart) validationErrors.push('Start date is required.');
        if (!dataEnd) validationErrors.push('End date is required.');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('description', dataDescription);
        formData.append('project', dataProject);
        formData.append('start', dataStart);
        formData.append('end', dataEnd);
        selectedRoles.forEach(roleId => {
            formData.append('roles', roleId);
        });

        try {
            const response = await apiService.postWithoutToken(
                `/api/sessions/${editSessionModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editSessionModal.onUpdated) editSessionModal.onUpdated();
                editSessionModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update session. Please check your connection and try again.']);
        }
    };

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-xl'>Edit Session Info</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Session name</label>
                            <input type="text" value={dataName} onChange={(e) => setDataName(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <input type="text" value={dataDescription} onChange={(e) => setDataDescription(e.target.value)} className="w-full h-[200px] p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Project</label>
                            <select value={dataProject} onChange={(e) => setDataProject(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl">
                                <option value="">Select a project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Start date</label>
                            <input type="date" value={dataStart} onChange={(e) => setDataStart(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>End date</label>
                            <input type="date" value={dataEnd} onChange={(e) => setDataEnd(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-xl'>Assign Roles</h2>

                    {roles.length > 0 ? (
                        <div className="py-2 space-y-2">
                            {roles.map((role) => (
                                <label key={role.id} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-lime-50">
                                    <input
                                        type="checkbox"
                                        checked={selectedRoles.includes(role.id)}
                                        onChange={() => toggleRole(role.id)}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-sm font-medium">{role.name}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="py-4 text-sm text-gray-500">No roles found for this project.</p>
                    )}

                    {errors.length > 0 && (
                        <div className="py-2">
                            {errors.map((error, index) => (
                                <p key={index} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    )}

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(1)} />
                    <SubmitButton label='Save Changes' onClick={submitForm} />
                </>
            )}
        </>
    );

    return (
        <Modal
            isOpen={editSessionModal.isOpen}
            close={editSessionModal.close}
            label='Edit Session'
            content={content}
        />
    );
};

export default EditSessionModal;
