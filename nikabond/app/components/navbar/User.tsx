'use client';

import { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignUpModal";
import { useEffect, useRef } from "react";
import LogoutButton from "../LogoutButton";

interface UserNavProps {
    userId?: string | null;
}

const User: React.FC<UserNavProps> = ({
    userId
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const loginModal = useLoginModal();
    const signUpModal = useSignupModal();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={ref} className="p-1 relative inline-block border rounded-full bg-gray-200 hover:bg-lime-300">
            <button
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <img src="/moi.png" alt="Userpic" className="w-[35px] h-[35px] rounded-full" />
            </button>

            {isOpen && (
                <div className="animate-fadeIn w-[180px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">

                    {userId ? (
                        <><MenuLink 
                            label="My account"
                            href="/mypage/1"
                            onClick={() => setIsOpen(false)}
                        /> 
                        <LogoutButton /></>

                    ) : (
                        <><MenuLink 
                            label="Log in"
                            onClick={() => {
                                console.log('clicked log in')
                                setIsOpen(false);
                                loginModal.open();
                            }}
                        />
                        <MenuLink 
                            label="Sign up"
                            onClick={() => {
                                console.log('clicked sign up')
                                setIsOpen(false);
                                signUpModal.open();
                            }}
                        /></>
                    )}
                </div>
            )}
        </div>
    )
}

export default User
