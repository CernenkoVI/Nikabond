'use client';

import { useState, useEffect } from "react";
import MyProjectsComponentItem from "./MyProjectsComponentItem";
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

    return (
        <div>
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
