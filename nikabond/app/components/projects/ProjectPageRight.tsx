'use client';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import useAddSessionModal from "../hooks/useAddSessionModal";

type SessionType = {
    id: string;
    name: string;
    start: string;
    end: string;
}

type ProjectType = {
    id: string;
    name: string;
    shooting_start: string;
    shooting_end: string;
    callback_start: string;
    callback_end: string;
    tryons_start: string;
    tryons_end: string;
    rehearsal_start: string;
    rehearsal_end: string;
}

const ProjectPageRight = ({ id }: { id: string }) => {
    const [project, setProject] = useState<ProjectType | null>(null);
    const [sessions, setSessions] = useState<SessionType[]>([]);
    const addSessionModal = useAddSessionModal();

    const fetchSessions = useCallback(async () => {
        try {
            const sessionsUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/sessions/?project=${id}`;
            const sessionsRes = await fetch(sessionsUrl, { method: 'GET' });
            const sessionsData = await sessionsRes.json();
            setSessions(sessionsData.data || []);
        } catch (error) {
            console.log('Failed to fetch sessions', error);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/${id}/`;
                const projectRes = await fetch(projectUrl, { method: 'GET' });
                const projectData = await projectRes.json();
                setProject(projectData);
            } catch (error) {
                console.log('Failed to fetch project', error);
            }
        };
        fetchData();
        fetchSessions();
    }, [id, fetchSessions]);

    if (!project) {
        return <div className="my-2 w-full lg:w-[45vh] p-4 bg-lime-100 rounded-xl">Loading...</div>;
    }

    return (
        <div className="my-2 w-full lg:w-[45vh] p-4 bg-lime-100 rounded-xl">
            <h1 className="mb-2 text-2xl font-semibold">{`Dates in ${project.name}`}</h1>

            <div className="space-y-1 text-sm">
                <div className="my-4 flex justify-between">
                    <span className="ml-2 font-medium">Shooting:</span>
                    <span className="ml-2 font-medium">{`${project.shooting_start} - ${project.shooting_end}`}</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Call-back:</span>
                    <span>{`${project.callback_start} - ${project.callback_end}`}</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Try-ons:</span>
                    <span>{`${project.tryons_start} - ${project.tryons_end}`}</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Rehearsal:</span>
                    <span>{`${project.rehearsal_start} - ${project.rehearsal_end}`}</span>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Sessions</h1>
                <button
                    onClick={() => addSessionModal.open(id, fetchSessions)}
                    className="w-8 h-8 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 text-lg font-bold"
                >
                    +
                </button>
            </div>

            {sessions.length > 0 ? (
                <div className="mt-2 space-y-2">
                    {sessions.map((session) => (
                        <Link key={session.id} href={`/sessions/${session.id}`}>
                            <div className="p-3 bg-white rounded-xl cursor-pointer hover:bg-lime-50">
                                <p className="text-sm font-semibold">{session.name}</p>
                                <p className="text-xs text-gray-500">{`${session.start} - ${session.end}`}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-2 text-sm text-gray-500">No sessions yet.</p>
            )}

            <h1 className="mt-4 mb-2 text-xl font-semibold">Notifications</h1>

            <div className="m-2 p-2 text-sm text-black bg-white rounded-xl">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </div>

            <div className="m-2 p-2 text-sm text-black bg-white rounded-xl">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </div>
        </div>
    )
}

export default ProjectPageRight;
