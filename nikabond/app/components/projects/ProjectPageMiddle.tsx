'use client';
import ProjectPageRoleItem from "./ProjectPageRoleItem";
import { useState, useEffect } from "react";
import { RoleType } from "../mypage/MyRolesComponent";
import useAddRoleModal from "../hooks/useAddRoleModal";


const ProjectPageMiddle = ({ id }: { id: string }) => {
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getRoles = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/roles/?project=${id}`;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, { method: 'GET' });
            const json = await response.json();
            setRoles(json.data);
        } catch (err) {
            setError('Failed to load roles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoles();
    }, [id]);

    const addRoleModal = useAddRoleModal();

    return (
        <div className="flex-1 p-4 shadow-xl">
            <div className="flex items-center m-2">
                <h1 className="text-3xl font-semibold">Roles in this project</h1>
                <button
                    onClick={() => addRoleModal.open(id)}
                    className="ml-3 cursor-pointer text-lime-500 hover:text-lime-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            {loading && (
                <p className="m-2 text-sm text-gray-500">Loading roles...</p>
            )}

            {error && (
                <p className="m-2 text-sm text-red-500">{error}</p>
            )}

            {!loading && !error && roles.length === 0 && (
                <p className="m-2 text-sm text-gray-500">No roles added yet.</p>
            )}

            {roles.map((role) => {
                return (
                    <ProjectPageRoleItem
                        key={role.id}
                        role={role}
                    />
                )
            })}

        </div>
    )
}

export default ProjectPageMiddle;
