'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

import Modal from "./Modal";
import useEditAgentModal from "../hooks/useEditAgentModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

const EditAgentModal = () => {
    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPhone, setDataPhone] = useState('');
    const [dataEmail, setDataEmail] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const editAgentModal = useEditAgentModal();
    const router = useRouter();

    useEffect(() => {
        if (editAgentModal.isOpen && editAgentModal.entityData) {
            const d = editAgentModal.entityData;
            setDataName(d.name || '');
            setDataDescription(d.description || '');
            setDataPhone(d.phone || '');
            setDataEmail(d.email || '');
            setDataImage(null);
            setCurrentStep(1);
            setErrors([]);
        }
    }, [editAgentModal.isOpen, editAgentModal.entityData]);

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
        if (!dataPhone) validationErrors.push('Phone is required.');
        if (!dataEmail) validationErrors.push('Email is required.');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('description', dataDescription);
        formData.append('phone', dataPhone);
        formData.append('email', dataEmail);
        if (dataImage) {
            formData.append('image', dataImage);
        }

        try {
            const response = await apiService.postWithoutToken(
                `/api/agents/${editAgentModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editAgentModal.onUpdated) editAgentModal.onUpdated();
                editAgentModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update agent. Please check your connection and try again.']);
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
                            <label>Info</label>
                            <input type="text" value={dataDescription} onChange={(e) => setDataDescription(e.target.value)} className="w-full h-[200px] p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Phone</label>
                            <input type="tel" value={dataPhone} onChange={(e) => setDataPhone(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Email</label>
                            <input type="email" value={dataEmail} onChange={(e) => setDataEmail(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-xl'>Image</h2>

                    <div className="py-2 space-y-4">
                        {editAgentModal.entityData?.image_url && !dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image fill alt='Current image' src={editAgentModal.entityData.image_url} className='w-full object-cover rounded-xl' />
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
            isOpen={editAgentModal.isOpen}
            close={editAgentModal.close}
            label='Edit Agent'
            content={content}
        />
    );
};

export default EditAgentModal;
