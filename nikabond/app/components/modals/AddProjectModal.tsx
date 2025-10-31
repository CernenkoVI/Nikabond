'use client';

import Image from "next/image";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useAddProjectModal from "../hooks/useAddProjectModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";


const AddProjectModal = () => {

    // States

    const [dataName, setDataName] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataShootingStart, setDataShootingStart] = useState('');
    const [dataShootingEnd, setDataShootingEnd] = useState('');
    const [dataCallbackStart, setDataCallbackStart] = useState('');
    const [dataCallbackEnd, setDataCallbackEnd] = useState('');
    const [dataTryonsStart, setDataTryonsStart] = useState('');
    const [dataTryonsEnd, setDataTryonsEnd] = useState('');
    const [dataRehearsalStart, setDataRehearsalStart] = useState('');
    const [dataRehearsalEnd, setDataRehearsalEnd] = useState('');
    const [dataImage, setDataImage] = useState<File | null>(null);
    

    const [currentStep, setCurrentStep] = useState(1);
    const addProjectModal = useAddProjectModal();
    const router = useRouter();

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    // Submit

    const submitForm = async () => {
        console.log('submit Form')

        if (
            dataName &&
            dataDescription &&
            dataShootingStart &&
            dataShootingEnd &&
            dataCallbackStart &&
            dataCallbackEnd &&
            dataTryonsStart &&
            dataTryonsEnd &&
            dataRehearsalStart &&
            dataRehearsalEnd &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('name',dataName);
            formData.append('description',dataDescription);
            formData.append('shooting_start',dataShootingStart);
            formData.append('shooting_end',dataShootingEnd);
            formData.append('callback_start',dataCallbackStart);
            formData.append('callback_end',dataCallbackEnd);
            formData.append('tryons_start',dataTryonsStart);
            formData.append('tryons_end',dataTryonsEnd);
            formData.append('rehearsal_start',dataRehearsalStart);
            formData.append('rehearsal_end',dataRehearsalEnd);
            formData.append('image',dataImage);

            const response = await apiService.postWithoutToken('/api/projects/create/', formData);

            if (response.success) {
                console.log('Success!');
                router.push('/mypage/1');
                addProjectModal.close();
            } else {
                console.log('Error');
            }
        }
    }

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-xl'>Add Project Info</h2>


                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Project name</label>
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
                            <label>Project description</label>
                            <input
                                type="text"
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <SubmitButton
                        label='Next'
                        onClick={() => setCurrentStep(2)}
                    />                
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-xl'>Add Project Dates</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Shooting start</label>
                            <input
                                type="date"
                                value={dataShootingStart}
                                onChange={(e) => setDataShootingStart(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Shooting end</label>
                            <input
                                type="date"
                                value={dataShootingEnd}
                                onChange={(e) => setDataShootingEnd(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Callback start</label>
                            <input
                                type="date"
                                value={dataCallbackStart}
                                onChange={(e) => setDataCallbackStart(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Callback end</label>
                            <input
                                type="date"
                                value={dataCallbackEnd}
                                onChange={(e) => setDataCallbackEnd(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <PreviousButton 
                        label='Previous'
                        className="mb-2"
                        onClick = {() => setCurrentStep(1)}
                    />                
                    <SubmitButton
                        label='Next'
                        onClick={() => setCurrentStep(3)}
                    />                
                
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-6 text-xl'>Add Project Dates</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Try-ons start</label>
                            <input
                                type="date"
                                value={dataTryonsStart}
                                onChange={(e) => setDataTryonsStart(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Try-ons end</label>
                            <input
                                type="date"
                                value={dataTryonsEnd}
                                onChange={(e) => setDataTryonsEnd(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Rehearsal start</label>
                            <input
                                type="date"
                                value={dataRehearsalStart}
                                onChange={(e) => setDataRehearsalStart(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Rehearsal end</label>
                            <input
                                type="date"
                                value={dataRehearsalEnd}
                                onChange={(e) => setDataRehearsalEnd(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>    

                    <PreviousButton 
                        label='Previous'
                        className="mb-2"
                        onClick = {() => setCurrentStep(2)}
                    />                
                    <SubmitButton
                        label='Next'
                        onClick={() => setCurrentStep(4)}
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
                        onClick = {() => setCurrentStep(3)}
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
                isOpen={addProjectModal.isOpen}
                close={addProjectModal.close}
                label='Create a new Project'
                content={content}
            />
        </>
    )
}

export default AddProjectModal;