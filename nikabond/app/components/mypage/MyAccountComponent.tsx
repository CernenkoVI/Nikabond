'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ActorsPageMiddle from "../actors/ActorsPageMiddle";
import ActorsPageRight from "../actors/ActorsPageRight";
import AttachedMediaButton from "../AttachedMediaButton";
import Image from "next/image";

const MyAccountComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <div className="flex flex-row">
                <h1 
                    className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                    onClick={toggleOpen}
                >
                    My&nbsp;Account
                </h1>

                <button className="cursor-pointer text-lime-500 p-4 hover:text-lime-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="account-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col lg:flex-row">
                            <div className="p-5 mt-1 grid grid-cols-1 lg:grid-cols-[20%_50%_30%] gap-4 shadow-md border border-gray-300 rounded-xl">
                                {/* Profile Picture Section */}
                                <div className="border border-lime-300 rounded-xl">
                                    <div className="relative overflow-hidden aspect-square border border-lime-300 rounded-xl">
                                        <Image
                                            fill
                                            src="/moi.png"
                                            className="hover:scale-110 object-cover transition h-full w-full"
                                            alt="Profile pic"
                                        />
                                    </div>
                                    <AttachedMediaButton />
                                </div>

                                {/* Middle Section */}
                                <div className="border border-lime-200 shadow-xl rounded-xl">
                                    <h2 className="p-2 text-xl">Visible Information</h2>
                                    <ActorsPageMiddle />
                                </div>

                                {/* Right Section */}
                                <div className="mr-5 bg-lime-100 rounded-xl">
                                    <h2 className="pl-2 py-2 text-xl">Invisible Information</h2>
                                    <ActorsPageRight />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyAccountComponent;
