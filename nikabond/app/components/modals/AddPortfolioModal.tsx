'use client';

import Modal from "./Modal";
import Image from "next/image";
import { useState } from "react";
import useAddPortfolioModal from "../hooks/useAddPortfolioModal";
import SubmitButton from "../SubmitButton";
import PreviousButton from "../PreviousButton";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import { ChangeEvent } from "react";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPortfolioModal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const addPortfolioModal = useAddPortfolioModal();
    const [dataName, setDataName] = useState("");
    const [dataDob, setDataDob] = useState("");
    const [dataPhone, setDataPhone] = useState("");
    const [dataEmail, setDataEmail] = useState("");
    const [dataGender, setDataGender] = useState("");
    const [dataOtherGender, setDataOtherGender] = useState("");
    const [dataProfession, setDataProfession] = useState("");
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);
    const [dataDescription, setDataDescription] = useState("");

    const router = useRouter();

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    const submitForm = async () => {
        console.log('submit form')

        if (
            dataName &&
            dataDob &&
            dataPhone &&
            dataEmail &&
            dataGender &&
            dataProfession &&
            dataCountry &&
            dataImage &&
            dataDescription
         ) {
            const formData = new FormData();
            formData.append('name', dataName);
            formData.append('dob', dataDob);
            formData.append('phone', dataPhone);
            formData.append('email', dataEmail);
            formData.append('gender', dataGender);
            formData.append('profession', dataProfession);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('image', dataImage);
            formData.append('description', dataDescription);

            const response = await apiService.post('/api/actors/create/', formData);

            if (response.success) {
                console.log('Success');

                router.push('/');

                addPortfolioModal.close();
            } else {
                console.log('Error');

                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
         }
    }

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Mandatory information (1/2)</h2>

                    <div className="pt3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Name</label>
                            <input
                                type="text"
                                value={dataName}
                                onChange={(e) => setDataName(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Date of birth</label>
                            <input
                                type="date"
                                value={dataDob}
                                onChange={(e) => setDataDob(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

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
                        onClick = {() => setCurrentStep(2)}
                    />                
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className="mb-4 text-2xl">Mandatory information (2/2)</h2>

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
                                <input
                                    type="radio"
                                    name="gender"
                                    value={opt.value}
                                    checked={dataGender === opt.value}
                                    onChange={e => setDataGender(e.target.value)}
                                />{" "}
                                {opt.label}
                                </label>
                            ))}
                            {dataGender === "other" && (
                                <input
                                type="text"
                                placeholder="Please specify"
                                value={dataOtherGender}
                                onChange={e => setDataOtherGender(e.target.value)}
                                className="p-1 mt-2 bg-gray-200 rounded-xl"
                                />
                            )}
                            </fieldset>

                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Profession</label>
                            <input
                                type="text"
                                value={dataProfession}
                                onChange={(e) => setDataProfession(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Country</label>
                            <SelectCountry 
                                value={dataCountry}
                                onChange={(value) => setDataCountry(value as SelectCountryValue)}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <input
                                type="text"
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
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
                        onClick = {() => setCurrentStep(3)}
                    />                
                </>
            ) : (
                <>
                    <h2 className="mb-4 text-2xl">Profile image</h2>

                    <div className="pt3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image
                                    fill
                                    alt='uploaded image'
                                    src={(URL.createObjectURL(dataImage))}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        )}
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                                key={index}
                                className='p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}

                    <PreviousButton 
                        label='Previous'
                        className="mb-2"
                        onClick = {() => setCurrentStep(2)}
                    />                
                    <SubmitButton 
                        label='Submit'
                        onClick = {submitForm}
                    />                
                </>
            )}
        </>
    )
    return (
        <>
            <Modal
                isOpen={addPortfolioModal.isOpen}
                close={addPortfolioModal.close}
                label="Create a portfolio"
                content={content}
            />
        </>
    )
}

export default AddPortfolioModal;