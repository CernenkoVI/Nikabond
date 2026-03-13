'use client';

import Modal from "./Modal";
import SubmitButton from "../SubmitButton";
import useLoginModal from "../hooks/useLoginModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const formData = {
            email: email,
            password: password
        }

        const response = await apiService.postWithoutToken('/api/auth/login/', formData)

        if (response.access) {
            await handleLogin(response.user.id, response.access, response.refresh);

            loginModal.close();
            router.push(`/mypage/${response.user.id}`);
            router.refresh();
        }else{
            setErrors(response.non_field_errors);
        }
    }

    const content = (
        <>
            <form
                onSubmit={submitLogin}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                {errors.map((error, index) => {
                    return (
                        <div
                            key={ `error-${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}

                <button
                    type="submit"
                    className="w-full py-4 bg-lime-300 hover:bg-lime-400 rounded-xl text-center transition cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    )
}

export default LoginModal;