'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";

import Modal from "./Modal";
import useAddAgentModal from "../hooks/useAddAgentModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

const AddAgentModal = () => {

    // States

    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPhone, setDataPhone] = useState('');
    const [dataEmail, setDataEmail] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);

    const addAgentModal = useAddAgentModal();

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    const router = useRouter();

        // Submit

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
            const response = await apiService.postWithoutToken('/api/agents/create/', formData);

            if (response.success) {
                router.push('/mypage/1');
                addAgentModal.close();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to create agent. Please check your connection and try again.']);
        }
    }


    const content = (
        <>
            {currentStep == 1 ? (
                <>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Name</label>
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
                            <label>Info</label>
                            <input
                                type="text"
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={dataPhone}
                                pattern="\+?[0-9\s\-\(\)]{7,20}"
                                onChange={(e) => setDataPhone(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>                    
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Email</label>
                            <input
                                type="email"
                                value={dataEmail}
                                onChange={(e) => setDataEmail(e.target.value)}
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
                    <h2 className='mb-6 text-xl'>Image</h2>

                    <div className="py-2 space-y-4">
                        <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className='w-[200-px] h-[150px] relative'>
                                <Image
                                    fill
                                    alt='Uploaded image'
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full object-cover rounded-xl'
                                />
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

                    <PreviousButton
                        label='Previous'
                        className="mb-2"
                        onClick = {() => setCurrentStep(1)}
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
                isOpen={addAgentModal.isOpen}
                close={addAgentModal.close}
                label='Create a new Agent portfolio'
                content={content}
            />
        </>
    )
}

export default AddAgentModal;