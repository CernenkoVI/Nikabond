'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MyCollectionsComponentItem from "./MyCollectionsComponentItem";

const MyCollectionsComponent = () => {
    const [isOpen, setIsOpen] = useState(false); // collapsed by default

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <h1 
                className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                onClick={toggleOpen}
            >
                My&nbsp;Collections
            </h1>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="collections-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2"
                    >
                        <MyCollectionsComponentItem />
                        <MyCollectionsComponentItem />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyCollectionsComponent;
