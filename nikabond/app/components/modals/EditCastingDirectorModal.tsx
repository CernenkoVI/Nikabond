'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

import Modal from "./Modal";
import useEditCastingDirectorModal from "../hooks/useEditCastingDirectorModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

const EditCastingDirectorModal = () => {
    const [dataCompany, setDataCompany] = useState('');
    const [dataPhone, setDataPhone] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const editModal = useEditCastingDirectorModal();
    const router = useRouter();

    useEffect(() => {
        if (editModal.isOpen && editModal.entityData) {
            const d = editModal.entityData;
            setDataCompany(d.company || '');
            setDataPhone(d.phone || '');
            setDataDescription(d.description || '');
            setDataImage(null);
            setCurrentStep(1);
            setErrors([]);
        }
    }, [editModal.isOpen, editModal.entityData]);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    const submitForm = async () => {
        setErrors([]);

        const formData = new FormData();
        formData.append('company', dataCompany);
        formData.append('phone', dataPhone);
        formData.append('description', dataDescription);
        if (dataImage) {
            formData.append('image', dataImage);
        }

        try {
            const response = await apiService.postWithoutToken(
                `/api/auth/casting-directors/${editModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editModal.onUpdated) editModal.onUpdated();
                editModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update profile. Please check your connection and try again.']);
        }
    };

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Company</label>
                            <input type="text" value={dataCompany} onChange={(e) => setDataCompany(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
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
                            <label>Description</label>
                            <textarea value={dataDescription} onChange={(e) => setDataDescription(e.target.value)} className="w-full h-[200px] p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-xl'>Profile Image</h2>

                    <div className="py-2 space-y-4">
                        {editModal.entityData?.image_url && !dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image fill alt='Current image' src={editModal.entityData.image_url} className='w-full object-cover rounded-xl' />
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
            isOpen={editModal.isOpen}
            close={editModal.close}
            label='Edit Profile'
            content={content}
        />
    );
};

export default EditCastingDirectorModal;
