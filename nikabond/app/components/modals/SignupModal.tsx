'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import SubmitButton from "../SubmitButton";
import useSignUpModal from "../hooks/useSignUpModal";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const ROLES = [
    { value: 'actor', label: 'Actor' },
    { value: 'agent', label: 'Agent' },
    { value: 'casting_director', label: 'Casting Director' },
];

const SignUpModal = () => {

    // Variables
    const router = useRouter();
    const signUpModal = useSignUpModal();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('actor');
    const [errors, setErrors] = useState<string[]>([]);

    // Submit functionality
    const submitSignup = async () => {
        const formData = {
            name: name,
            email: email,
            password1: password1,
            password2: password2,
            role: role
        }

        const response = await apiService.postWithoutToken('/api/auth/register/', formData);

        if (response.access) {
            await handleLogin(response.user.id, response.access, response.refresh);

            signUpModal.close();
            router.push(`/mypage/${response.user.id}`);
            router.refresh();
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
                <input onChange={(e) => setName(e.target.value)} placeholder="Your name" type="text" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                    <div className="flex gap-2">
                        {ROLES.map((r) => (
                            <button
                                key={r.value}
                                type="button"
                                onClick={() => setRole(r.value)}
                                className={`flex-1 py-3 px-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                                    role === r.value
                                        ? 'border-airbnb bg-airbnb text-white'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>

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
