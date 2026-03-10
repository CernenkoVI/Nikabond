'use client';

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectPageRoleItem from "../projects/ProjectPageRoleItem";
import useAddRoleModal from "../hooks/useAddRoleModal";

export type RoleType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
    project_id: string;
}

const MyRolesComponent = () => {
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getRoles = async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/`;
            const response = await fetch(url, { method: 'GET' });
            const json = await response.json();
            setRoles(json.data);
        } catch (error) {
            console.log('error', error);
            setError('Failed to load roles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoles();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(prev => !prev);

    const addRoleModal = useAddRoleModal();

    const addRole = () => {
        addRoleModal.open();
    }

    return (
        <>
            <div className="flex flex-row">
                <h1
                    className="mt-2 mb-2 text-xl cursor-pointer select-none w-[200px] rounded-xl bg-lime-100 p-2"
                    onClick={toggleOpen}
                >
                    My&nbsp;Roles
                </h1>

                <button
                    onClick={addRole}
                    className="cursor-pointer text-lime-500 p-4 hover:text-lime-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                </button>
            </div>

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
                        {loading && (
                            <p className="p-2 text-sm text-gray-500">Loading roles...</p>
                        )}

                        {error && (
                            <p className="p-2 text-sm text-red-500">{error}</p>
                        )}

                        {!loading && !error && roles.length === 0 && (
                            <p className="p-2 text-sm text-gray-500">No roles yet.</p>
                        )}

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
