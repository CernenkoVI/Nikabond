'use client';

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectPageRoleItem from "../projects/ProjectPageRoleItem";

export type RoleType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
    project_id: number;
}

const MyRolesComponent = () => {
    const[roles,setRoles] = useState<RoleType[]>([]);

    const getRoles = async () => {
        const url = 'http://localhost:8000/api/roles/';
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((json) => {
                console.log('json',json)

                setRoles(json.data)
            })
            .catch((error) => {
                console.log('error',error)
            })
    };

    useEffect(() => {
        getRoles();
    }, []);

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

                        {roles.map((role) => {
                            return (
                                <ProjectPageRoleItem
                                    key={role.id}
                                    role={role}
                                />
                            )
                        })}


                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MyRolesComponent;
