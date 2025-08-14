'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MyProjectsComponentItem from "./MyProjectsComponentItem";

const MyProjectsComponent = () => {
    const [isOpen, setIsOpen] = useState(false); // collapsed by default

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <div className="flex flex-row">
                <h1 
                    className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                    onClick={toggleOpen}
                >
                    My&nbsp;Projects
                </h1>

                <button className="cursor-pointer text-lime-500 p-4 hover:text-lime-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                </button>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="projects-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden m-1 border border-gray-300 rounded-xl"
                    >
                        <MyProjectsComponentItem />
                        <MyProjectsComponentItem />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyProjectsComponent;
