'use client';

import { useState, useEffect } from "react";

import Modal from "./Modal";
import useAddSessionModal from "../hooks/useAddSessionModal";
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

const AddSessionModal = () => {

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

    const addSessionModal = useAddSessionModal();

    // When modal opens, pre-fill project if provided and fetch project list
    useEffect(() => {
        if (addSessionModal.isOpen) {
            if (addSessionModal.projectId) {
                setDataProject(addSessionModal.projectId);
            }
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
    }, [addSessionModal.isOpen, addSessionModal.projectId]);

    // Fetch roles when project changes
    useEffect(() => {
        if (dataProject) {
            const fetchRoles = async () => {
                try {
                    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/?project=${dataProject}`;
                    const response = await fetch(url, { method: 'GET' });
                    const json = await response.json();
                    setRoles(json.data || []);
                    setSelectedRoles([]);
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

    const resetForm = () => {
        setDataName('');
        setDataDescription('');
        setDataProject('');
        setDataStart('');
        setDataEnd('');
        setSelectedRoles([]);
        setRoles([]);
        setCurrentStep(1);
        setErrors([]);
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
            const response = await apiService.postWithoutToken('/api/sessions/create/', formData);

            if (response.success) {
                if (addSessionModal.onCreated) {
                    addSessionModal.onCreated();
                }
                resetForm();
                addSessionModal.close();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to create session. Please check your connection and try again.']);
        }
    }

    const hasPresetProject = !!addSessionModal.projectId;

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-xl'>Session Info</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Session name</label>
                            <input
                                type="text"
                                value={dataName}
                                onChange={(e) => setDataName(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <input
                                type="text"
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    {hasPresetProject ? (
                        <div className="py-2 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label>Project</label>
                                <div className="w-full p-4 border border-gray-300 rounded-xl bg-gray-100 text-gray-600">
                                    {projects.find(p => p.id === dataProject)?.name || 'Loading...'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-2 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label>Project</label>
                                <select
                                    value={dataProject}
                                    onChange={(e) => setDataProject(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                >
                                    <option value="">Select a project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Start date</label>
                            <input
                                type="date"
                                value={dataStart}
                                onChange={(e) => setDataStart(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>End date</label>
                            <input
                                type="date"
                                value={dataEnd}
                                onChange={(e) => setDataEnd(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <SubmitButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />
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
                        <p className="py-4 text-sm text-gray-500">No roles found for this project. Create roles first.</p>
                    )}

                    {errors.length > 0 && (
                        <div className="py-2">
                            {errors.map((error, index) => (
                                <p key={index} className="text-sm text-red-500">{error}</p>
                            ))}
                        </div>
                    )}

                    <PreviousButton
                        label='Previous'
                        className="mb-2"
                        onClick={() => setCurrentStep(1)}
                    />
                    <SubmitButton
                        label='Submit'
                        onClick={submitForm}
                    />
                </>
            )}
        </>
    )

    return (
        <>
            <Modal
                isOpen={addSessionModal.isOpen}
                close={addSessionModal.close}
                label='Create a new Session'
                content={content}
            />
        </>
    )
}

export default AddSessionModal;
