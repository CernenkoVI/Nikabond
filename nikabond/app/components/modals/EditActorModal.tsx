'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";

import Modal from "./Modal";
import useEditActorModal from "../hooks/useEditActorModal";
import PreviousButton from "../PreviousButton";
import SubmitButton from "../SubmitButton";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";

import apiService from "@/app/services/apiService";

const EditActorModal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const editActorModal = useEditActorModal();
    const router = useRouter();

    const [dataName, setDataName] = useState("");
    const [dataDob, setDataDob] = useState("");
    const [dataPhone, setDataPhone] = useState("");
    const [dataEmail, setDataEmail] = useState("");
    const [dataGender, setDataGender] = useState("");
    const [dataOtherGender, setDataOtherGender] = useState("");
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataDescription, setDataDescription] = useState("");
    const [dataImage, setDataImage] = useState<File | null>(null);
    const [dataHaircolor, setDataHaircolor] = useState("");
    const [dataHairstyle, setDataHairstyle] = useState("");
    const [dataEyecolor, setDataEyecolor] = useState("");
    const [dataEthnicity, setDataEthnicity] = useState("");
    const [dataInfo, setDataInfo] = useState("");
    const [dataExperience, setDataExperience] = useState("");
    const [dataSkills, setDataSkills] = useState("");
    const [dataOccupations, setDataOccupations] = useState("");
    const [dataLanguages, setDataLanguages] = useState("");
    const [dataLicence, setDataLicence] = useState("");
    const [dataHeight, setDataHeight] = useState("");
    const [dataCitizenship, setDataCitizenship] = useState("");
    const [dataWorkPermits, setDataWorkPermits] = useState("");
    const [dataSize, setDataSize] = useState("");
    const [dataShoeSize, setDataShoeSize] = useState("");
    const [dataCwh, setDataCwh] = useState("");

    useEffect(() => {
        if (editActorModal.isOpen && editActorModal.entityData) {
            const d = editActorModal.entityData;
            setDataName(d.name || "");
            setDataDob(d.dob || "");
            setDataPhone(d.phone || "");
            setDataEmail(d.email || "");
            setDataGender(d.gender || "");
            setDataOtherGender(d.gender_other || "");
            setDataDescription(d.description || "");
            setDataHaircolor(d.haircolor || "");
            setDataHairstyle(d.hairstyle || "");
            setDataEyecolor(d.eyecolor || "");
            setDataEthnicity(d.ethnicity || "");
            setDataInfo(d.info || "");
            setDataExperience(d.experience || "");
            setDataSkills(d.skills || "");
            setDataOccupations(d.occupations || "");
            setDataLanguages(d.languages || "");
            setDataLicence(d.licence || "");
            setDataHeight(d.height ? String(d.height) : "");
            setDataCitizenship(d.citizenship || "");
            setDataWorkPermits(d.work_permits || "");
            setDataSize(d.size || "");
            setDataShoeSize(d.shoe_size || "");
            setDataCwh(d.cwh || "");
            if (d.country && d.country_code) {
                setDataCountry({ label: d.country, value: d.country_code });
            }
            setDataImage(null);
            setCurrentStep(1);
            setErrors([]);
        }
    }, [editActorModal.isOpen, editActorModal.entityData]);

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    const submitForm = async () => {
        setErrors([]);

        const validationErrors: string[] = [];
        if (!dataName) validationErrors.push('Name is required.');
        if (!dataEmail) validationErrors.push('Email is required.');

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('dob', dataDob);
        formData.append('phone', dataPhone);
        formData.append('email', dataEmail);
        formData.append('gender', dataGender);
        formData.append('gender_other', dataOtherGender);
        formData.append('description', dataDescription);
        if (dataCountry) {
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
        }
        formData.append('haircolor', dataHaircolor);
        formData.append('hairstyle', dataHairstyle);
        formData.append('eyecolor', dataEyecolor);
        formData.append('ethnicity', dataEthnicity);
        formData.append('info', dataInfo);
        formData.append('experience', dataExperience);
        formData.append('skills', dataSkills);
        formData.append('occupations', dataOccupations);
        formData.append('languages', dataLanguages);
        formData.append('licence', dataLicence);
        if (dataHeight) formData.append('height', dataHeight);
        formData.append('citizenship', dataCitizenship);
        formData.append('work_permits', dataWorkPermits);
        formData.append('size', dataSize);
        formData.append('shoe_size', dataShoeSize);
        formData.append('cwh', dataCwh);
        if (dataImage) {
            formData.append('image', dataImage);
        }

        try {
            const response = await apiService.postWithoutToken(
                `/api/actors/${editActorModal.entityId}/update/`,
                formData
            );

            if (response.success) {
                if (editActorModal.onUpdated) editActorModal.onUpdated();
                editActorModal.close();
                router.refresh();
            } else {
                setErrors(['Something went wrong. Please try again.']);
            }
        } catch (e) {
            setErrors(['Failed to update actor. Please check your connection and try again.']);
        }
    };

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Basic Info (1/4)</h2>

                    <div className="pt3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Name</label>
                            <input type="text" value={dataName} onChange={(e) => setDataName(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Date of birth</label>
                            <input type="date" value={dataDob} onChange={(e) => setDataDob(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Phone</label>
                            <input type="tel" value={dataPhone} onChange={(e) => setDataPhone(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Email</label>
                            <input type="email" value={dataEmail} onChange={(e) => setDataEmail(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <SubmitButton label='Next' onClick={() => setCurrentStep(2)} />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className="mb-4 text-2xl">Personal Details (2/4)</h2>

                    <div className="pt3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Gender</label>
                            <fieldset className="p-2 border border-gray-600 rounded-xl">
                                {[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                    { label: "Non-binary", value: "nonbinary" },
                                    { label: "Other", value: "other" },
                                    { label: "Prefer not to say", value: "no_answer" },
                                ].map(opt => (
                                    <label key={opt.value} className="mr-4">
                                        <input type="radio" name="gender" value={opt.value} checked={dataGender === opt.value} onChange={e => setDataGender(e.target.value)} />{" "}
                                        {opt.label}
                                    </label>
                                ))}
                                {dataGender === "other" && (
                                    <input type="text" placeholder="Please specify" value={dataOtherGender} onChange={e => setDataOtherGender(e.target.value)} className="p-1 mt-2 bg-gray-200 rounded-xl" />
                                )}
                            </fieldset>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Country</label>
                            <SelectCountry value={dataCountry} onChange={(value) => setDataCountry(value as SelectCountryValue)} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <input type="text" value={dataDescription} onChange={(e) => setDataDescription(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Ethnicity</label>
                            <select value={dataEthnicity} onChange={(e) => setDataEthnicity(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl">
                                <option value="">Select</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="asian">Asian</option>
                                <option value="other">Other</option>
                                <option value="no_answer">Prefer not to say</option>
                            </select>
                        </div>
                    </div>

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(1)} />
                    <SubmitButton label='Next' onClick={() => setCurrentStep(3)} />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className="mb-4 text-2xl">Professional Info (3/4)</h2>

                    <div className="pt3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Info</label>
                            <textarea value={dataInfo} onChange={(e) => setDataInfo(e.target.value)} className="w-full h-[100px] p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Experience</label>
                            <input type="text" value={dataExperience} onChange={(e) => setDataExperience(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Skills</label>
                            <input type="text" value={dataSkills} onChange={(e) => setDataSkills(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Occupations</label>
                            <input type="text" value={dataOccupations} onChange={(e) => setDataOccupations(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Languages</label>
                            <input type="text" value={dataLanguages} onChange={(e) => setDataLanguages(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-2">
                                <label>Hair color</label>
                                <input type="text" value={dataHaircolor} onChange={(e) => setDataHaircolor(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Hair style</label>
                                <input type="text" value={dataHairstyle} onChange={(e) => setDataHairstyle(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Eye color</label>
                                <input type="text" value={dataEyecolor} onChange={(e) => setDataEyecolor(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Height</label>
                                <input type="number" value={dataHeight} onChange={(e) => setDataHeight(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Size</label>
                                <input type="text" value={dataSize} onChange={(e) => setDataSize(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Shoe size</label>
                                <input type="text" value={dataShoeSize} onChange={(e) => setDataShoeSize(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Licence</label>
                            <input type="text" value={dataLicence} onChange={(e) => setDataLicence(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Citizenship</label>
                            <input type="text" value={dataCitizenship} onChange={(e) => setDataCitizenship(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>Work permits</label>
                            <input type="text" value={dataWorkPermits} onChange={(e) => setDataWorkPermits(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label>CWH</label>
                            <input type="text" value={dataCwh} onChange={(e) => setDataCwh(e.target.value)} className="w-full p-4 border border-gray-600 rounded-xl" />
                        </div>
                    </div>

                    <PreviousButton label='Previous' className="mb-2" onClick={() => setCurrentStep(2)} />
                    <SubmitButton label='Next' onClick={() => setCurrentStep(4)} />
                </>
            ) : (
                <>
                    <h2 className="mb-4 text-2xl">Profile Image (4/4)</h2>

                    <div className="pt3 pb-6 space-y-4">
                        {editActorModal.entityData?.image_url && !dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image fill alt='Current image' src={editActorModal.entityData.image_url} className="w-full h-full object-cover rounded-xl" />
                            </div>
                        )}

                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input type="file" accept="image/*" onChange={setImage} />
                        </div>

                        {dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image fill alt='New image' src={URL.createObjectURL(dataImage)} className="w-full h-full object-cover rounded-xl" />
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
            isOpen={editActorModal.isOpen}
            close={editActorModal.close}
            label="Edit Actor"
            content={content}
        />
    );
};

export default EditActorModal;
