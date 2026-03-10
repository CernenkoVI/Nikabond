'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

import Modal from "./Modal";
import useEditRoleModal from "../hooks/useEditRoleModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

type ProjectOption = {
    id: string;
    name: string;
}

const EditRoleModal = () => {
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataProject, setDataProject] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);

    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const editRoleModal = useEditRoleModal();
    const router = useRouter();

    useEffect(() => {
        if (editRoleModal.isOpen && editRoleModal.entityData) {
            const d = editRoleModal.entityData;
            setDataName(d.name || '');
            setDataDescription(d.description || '');
            setDataProject(d.project?.id || '');
            setDataImage(null);
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
    }, [editRoleModal.isOpen, editRoleModal.entityData]);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    const submitForm = async () => {
        setErrors([]);

        const validationErrors: string[] = [];
        if (!dataName) validationErrors.push('Name is required.');
        if (!dataDescription) validationErrors.push('Description is required.');
        if (!dataProject) validationErrors.push('Project is required.');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('description', dataDescription);
        formData.append('project', dataProject);
        if (dataImage) {
            formData.append('image', dataImage);
        }

        try {
            const response = await apiService.postWithoutToken(
                `/api/roles/${editRoleModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editRoleModal.onUpdated) editRoleModal.onUpdated();
                editRoleModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update role. Please check your connection and try again.']);
        }
    };

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Name</label>
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

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-xl'>Image</h2>

                    <div className="py-2 space-y-4">
                        {editRoleModal.entityData?.image_url && !dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image fill alt='Current image' src={editRoleModal.entityData.image_url} className='w-full object-cover rounded-xl' />
                            </div>
                        )}

                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input type='file' accept='image/*' onChange={setImage} />
                        </div>

                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image fill alt='New image' src={URL.createObjectURL(dataImage)} className='w-full object-cover rounded-xl' />
                            </div>
                        )}
                    </div>

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
            isOpen={editRoleModal.isOpen}
            close={editRoleModal.close}
            label='Edit Role'
            content={content}
        />
    );
};

export default EditRoleModal;
