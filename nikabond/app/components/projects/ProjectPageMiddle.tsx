'use client';
import ProjectPageRoleItem from "./ProjectPageRoleItem";
import { useState, useEffect } from "react";
import { RoleType } from "../mypage/MyRolesComponent";

const ProjectPageMiddle = () => {
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

    return (
        <div className="flex-1 p-4 shadow-xl">
            <h1 className="m-2 text-3xl font-semibold">Roles in this project</h1>

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