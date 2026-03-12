'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignUpModal";
import { resetAuthCookies } from "@/app/lib/actions";

interface UserNavProps {
    userId?: string | null;
}

const User: React.FC<UserNavProps> = ({
    userId
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const signUpModal = useSignupModal();

    const submitLogout = async () => {
        await resetAuthCookies();
        router.refresh();
    };

    if (userId) {
        return (
            <div className="flex items-center space-x-2">
                <Link href={`/mypage/${userId}`} className="cursor-pointer">
                    <img src="/moi.png" alt="My page" className="w-[30px] h-[30px] rounded-full hover:ring-2 hover:ring-lime-400 transition" />
                </Link>

                <button
                    onClick={submitLogout}
                    className="cursor-pointer text-gray-600 hover:text-lime-600 transition"
                    title="Log out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={loginModal.open}
                className="cursor-pointer text-sm font-semibold text-lime-700 hover:text-lime-500 transition"
            >
                Log in
            </button>
            <button
                onClick={signUpModal.open}
                className="cursor-pointer text-sm font-semibold bg-lime-500 text-white px-3 py-1 rounded-full hover:bg-lime-600 transition"
            >
                Sign up
            </button>
        </div>
    );
}

export default User;
