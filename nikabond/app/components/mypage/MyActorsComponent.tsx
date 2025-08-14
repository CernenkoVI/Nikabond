'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ActorsList from "../actors/ActorsList";
import useAddPortfolioModal from "../hooks/useAddPortfolioModal";

const MyActorsComponent = () => {
    const addPortfolioModal = useAddPortfolioModal();
    const nikabondPortfolio = () => {
        addPortfolioModal.open()
    }

    const [isOpen, setIsOpen] = useState(false); // collapsed by default

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <div className="flex flex-row">
                <h1 
                    className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                    onClick={toggleOpen}
                >
                    My&nbsp;Actors
                </h1>

                <button 
                    onClick={nikabondPortfolio}
                    className="cursor-pointer text-lime-500 p-4 hover:text-lime-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </button>
            </div>


            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="actors-list"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        
                        <div className="p-5 my-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <ActorsList />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyActorsComponent;
