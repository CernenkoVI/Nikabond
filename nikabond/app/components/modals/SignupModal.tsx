'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import SubmitButton from "../SubmitButton";
import useSignUpModal from "../hooks/useSignUpModal";
import { useFormState } from "react-dom";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignUpModal = () => {

    // Variables
    const router = useRouter();
    const signUpModal = useSignUpModal();
    const [email, setEmail] = useState('');
//    const [email2, setEmail2] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    // Submit functionality
    const submitSignup = async () => {
        const formData = {
            email: email,
//            email2: email2,
            password1: password1,
            password2: password2
        }

        const response = await apiService.postWithoutToken('/api/auth/register/', JSON.stringify(formData));

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh)

            signUpModal.close();
            router.push('/')
        }else{
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })

            setErrors(tmpErrors);
        }
    }

    const content = (
        <>            
            <form 
                action={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                {errors.map((error, index) => {
                    return (
                        <div 
                            key={ `error-${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}

                <SubmitButton 
                    label="Submit"
                    onClick={submitSignup}/>
            </form>
        </>
    )

    return (
        <Modal
            isOpen={signUpModal.isOpen}
            close={signUpModal.close}
            label="Sign up"
            content={content}
        />
    )
}

export default SignUpModal;