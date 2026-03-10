'use client';
import ProjectPageRoleItem from "./ProjectPageRoleItem";
import { useState, useEffect } from "react";
import { RoleType } from "../mypage/MyRolesComponent";


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

    return (
        <div className="flex-1 p-4 shadow-xl">
            <h1 className="m-2 text-3xl font-semibold">Roles in this project</h1>

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
