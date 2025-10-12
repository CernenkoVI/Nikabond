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
        console.log('submit Form')

        if (
            dataName &&
            dataDescription &&
            dataPhone &&
            dataEmail &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('name',dataName);
            formData.append('description',dataDescription);
            formData.append('phone',dataPhone);
            formData.append('email',dataEmail);
            formData.append('image',dataImage);

            const response = await apiService.postWithoutToken('/api/agents/create/', formData);

            if (response.success) {
                console.log('Success!');
                router.push('/mypage/1');
                addAgentModal.close();
            } else {
                console.log('Error');
            }
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
                                    alt='Upladed image'
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>

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