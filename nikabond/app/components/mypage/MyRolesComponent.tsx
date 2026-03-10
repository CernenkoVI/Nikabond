'use client';

import { useState, useEffect } from "react";
import ProjectPageRoleItem from "../projects/ProjectPageRoleItem";
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

    return (
        <div>
            <div className="space-y-2">
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
            </div>
        </div>
    );
};

export default MyRolesComponent;
