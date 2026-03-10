'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

import Modal from "./Modal";
import useEditProjectModal from "../hooks/useEditProjectModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";

import apiService from "@/app/services/apiService";

const EditProjectModal = () => {
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
    const [errors, setErrors] = useState<string[]>([]);

    const editProjectModal = useEditProjectModal();
    const router = useRouter();

    useEffect(() => {
        if (editProjectModal.isOpen && editProjectModal.entityData) {
            const d = editProjectModal.entityData;
            setDataName(d.name || '');
            setDataDescription(d.description || '');
            setDataShootingStart(d.shooting_start || '');
            setDataShootingEnd(d.shooting_end || '');
            setDataCallbackStart(d.callback_start || '');
            setDataCallbackEnd(d.callback_end || '');
            setDataTryonsStart(d.tryons_start || '');
            setDataTryonsEnd(d.tryons_end || '');
            setDataRehearsalStart(d.rehearsal_start || '');
            setDataRehearsalEnd(d.rehearsal_end || '');
            setDataImage(null);
            setCurrentStep(1);
            setErrors([]);
        }
    }, [editProjectModal.isOpen, editProjectModal.entityData]);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    const submitForm = async () => {
        setErrors([]);

        const validationErrors: string[] = [];
        if (!dataName) validationErrors.push('Project name is required.');
        if (!dataDescription) validationErrors.push('Description is required.');
        if (!dataShootingStart) validationErrors.push('Shooting start date is required.');
        if (!dataShootingEnd) validationErrors.push('Shooting end date is required.');
        if (!dataCallbackStart) validationErrors.push('Callback start date is required.');
        if (!dataCallbackEnd) validationErrors.push('Callback end date is required.');
        if (!dataTryonsStart) validationErrors.push('Try-ons start date is required.');
        if (!dataTryonsEnd) validationErrors.push('Try-ons end date is required.');
        if (!dataRehearsalStart) validationErrors.push('Rehearsal start date is required.');
        if (!dataRehearsalEnd) validationErrors.push('Rehearsal end date is required.');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('description', dataDescription);
        formData.append('shooting_start', dataShootingStart);
        formData.append('shooting_end', dataShootingEnd);
        formData.append('callback_start', dataCallbackStart);
        formData.append('callback_end', dataCallbackEnd);
        formData.append('tryons_start', dataTryonsStart);
        formData.append('tryons_end', dataTryonsEnd);
        formData.append('rehearsal_start', dataRehearsalStart);
        formData.append('rehearsal_end', dataRehearsalEnd);
        if (dataImage) {
            formData.append('image', dataImage);
        }

        try {
            const response = await apiService.postWithoutToken(
                `/api/projects/${editProjectModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editProjectModal.onUpdated) editProjectModal.onUpdated();
                editProjectModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update project. Please check your connection and try again.']);
        }
    };

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-xl'>Edit Project Info</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Project name</label>
                            <input type="text" value={dataName} onChange={(e) => setDataName(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Project description</label>
                            <input type="text" value={dataDescription} onChange={(e) => setDataDescription(e.target.value)} className="w-full h-[200px] p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-xl'>Edit Dates (Shooting & Callback)</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Shooting start</label>
                            <input type="date" value={dataShootingStart} onChange={(e) => setDataShootingStart(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Shooting end</label>
                            <input type="date" value={dataShootingEnd} onChange={(e) => setDataShootingEnd(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Callback start</label>
                            <input type="date" value={dataCallbackStart} onChange={(e) => setDataCallbackStart(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Callback end</label>
                            <input type="date" value={dataCallbackEnd} onChange={(e) => setDataCallbackEnd(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(1)} />
                    <SubmitButton label='Next' onClick={() => setCurrentStep(3)} />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className='mb-6 text-xl'>Edit Dates (Try-ons & Rehearsal)</h2>

                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Try-ons start</label>
                            <input type="date" value={dataTryonsStart} onChange={(e) => setDataTryonsStart(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Try-ons end</label>
                            <input type="date" value={dataTryonsEnd} onChange={(e) => setDataTryonsEnd(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Rehearsal start</label>
                            <input type="date" value={dataRehearsalStart} onChange={(e) => setDataRehearsalStart(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>
                    <div className="py-2 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Rehearsal end</label>
                            <input type="date" value={dataRehearsalEnd} onChange={(e) => setDataRehearsalEnd(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(2)} />
                    <SubmitButton label='Next' onClick={() => setCurrentStep(4)} />
                </>
            ) : (
                <>
                    <h2 className='mb-6 text-xl'>Image</h2>

                    <div className="py-2 space-y-4">
                        {editProjectModal.entityData?.image_url && !dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image fill alt='Current image' src={editProjectModal.entityData.image_url} className='w-full object-cover rounded-xl' />
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

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(3)} />
                    <SubmitButton label='Save Changes' onClick={submitForm} />
                </>
            )}
        </>
    );

    return (
        <Modal
            isOpen={editProjectModal.isOpen}
            close={editProjectModal.close}
            label='Edit Project'
            content={content}
        />
    );
};

export default EditProjectModal;
