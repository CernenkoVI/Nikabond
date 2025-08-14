'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectPageRoleItem from "../projects/ProjectPageRoleItem";

const MyRolesComponent = () => {
    const [isOpen, setIsOpen] = useState(false); // collapsed by default

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <h1
                className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                onClick={toggleOpen}
            >
                My&nbsp;Roles
            </h1>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="roles-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2"
                    >
                        <ProjectPageRoleItem />
                        <ProjectPageRoleItem />
                        <ProjectPageRoleItem />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyRolesComponent;
