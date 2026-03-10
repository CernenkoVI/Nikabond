'use client';

import { useState, useEffect } from "react";
import MyProjectsComponentItem from "./MyProjectsComponentItem";
import useAddProjectModal from "../hooks/useAddProjectModal";

export type ProjectType = {
    id: string;
    name: string;
    description: string;
    shooting_start: string;
    shooting_end: string;
    image_url: string;
}

const MyProjectsComponent = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);

    const getProjects = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/`;
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((json) => {
                console.log('json', json)
                setProjects(json.data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    };

    useEffect(() => {
        getProjects();
    }, []);

    const addProjectModal = useAddProjectModal();

    const addProject = () => {
        addProjectModal.open()
    }

    return (
        <div>
            <div className="flex justify-end mb-2">
                <button
                    onClick={addProject}
                    className="cursor-pointer text-lime-500 hover:text-lime-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                </button>
            </div>

            <div className="border border-gray-300 rounded-xl">
                {projects.map((project) => {
                    return (
                        <MyProjectsComponentItem
                            key={project.id}
                            project={project}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default MyProjectsComponent;
