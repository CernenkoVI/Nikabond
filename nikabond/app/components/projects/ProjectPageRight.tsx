'use client';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import useAddSessionModal from "../hooks/useAddSessionModal";
import StatusBadge from "../StatusBadge";
import apiService from "@/app/services/apiService";

const formatDate = (date: string) => {
    try {
        return format(parseISO(date), 'd MMM yyyy');
    } catch {
        return date;
    }
};

type RoleType = {
    id: string;
    name: string;
}

type SessionType = {
    id: string;
    title: string;
    scheduled_at: string | null;
    status: string;
    actor_count: number;
    roles: RoleType[];
    // Legacy fields
    name?: string;
    start?: string;
    end?: string;
}

type NotificationType = {
    id: string;
    author_name: string;
    body: string;
    created_at: string;
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
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [newNotification, setNewNotification] = useState('');
    const [authorName, setAuthorName] = useState('');
    const addSessionModal = useAddSessionModal();

    const fetchNotifications = useCallback(async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/notifications/?project=${id}`;
            const res = await fetch(url, { method: 'GET' });
            const data = await res.json();
            setNotifications(data.data || []);
        } catch (error) {
            console.log('Failed to fetch notifications', error);
        }
    }, [id]);

    const submitNotification = async () => {
        if (!newNotification.trim() || !authorName.trim()) return;

        const formData = new FormData();
        formData.append('author_name', authorName.trim());
        formData.append('body', newNotification.trim());
        formData.append('project', id);

        try {
            const response = await apiService.postWithoutToken('/api/notifications/create/', formData);
            if (response.success) {
                setNewNotification('');
                fetchNotifications();
            }
        } catch (error) {
            console.log('Failed to create notification', error);
        }
    };

    const deleteNotification = async (notificationId: string) => {
        try {
            const response = await apiService.deleteWithoutToken(`/api/notifications/${notificationId}/delete/`);
            if (response.success) {
                fetchNotifications();
            }
        } catch (error) {
            console.log('Failed to delete notification', error);
        }
    };

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
        fetchNotifications();
    }, [id, fetchSessions, fetchNotifications]);

    if (!project) {
        return <div className="my-2 w-full lg:w-[45vh] p-4 bg-lime-100 rounded-xl">Loading...</div>;
    }

    return (
        <div className="my-2 w-full lg:w-[45vh] p-4 bg-lime-100 rounded-xl">
            <h1 className="mb-2 text-2xl font-semibold">{`Dates in ${project.name}`}</h1>

            <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                <div>
                    <span className="ml-2 font-medium">Shooting:</span>
                    <div className="ml-4 mt-1 text-gray-700">
                        <p>{formatDate(project.shooting_start)}</p>
                        <p>{formatDate(project.shooting_end)}</p>
                    </div>
                </div>
                <div>
                    <span className="ml-2">Try-ons:</span>
                    <div className="ml-4 mt-1 text-gray-700">
                        <p>{formatDate(project.tryons_start)}</p>
                        <p>{formatDate(project.tryons_end)}</p>
                    </div>
                </div>
                <div>
                    <span className="ml-2">Call-back:</span>
                    <div className="ml-4 mt-1 text-gray-700">
                        <p>{formatDate(project.callback_start)}</p>
                        <p>{formatDate(project.callback_end)}</p>
                    </div>
                </div>
                <div>
                    <span className="ml-2">Rehearsal:</span>
                    <div className="ml-4 mt-1 text-gray-700">
                        <p>{formatDate(project.rehearsal_start)}</p>
                        <p>{formatDate(project.rehearsal_end)}</p>
                    </div>
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
                <div className="mt-3 space-y-3">
                    {sessions.map((session) => (
                        <Link key={session.id} href={`/sessions/${session.id}`}>
                            <div className="p-3 mb-3 bg-white rounded-xl cursor-pointer hover:bg-lime-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold">{session.title || session.name}</p>
                                    <StatusBadge status={session.status || 'draft'} />
                                </div>
                                <p className="text-xs text-gray-500">
                                    {session.scheduled_at
                                        ? formatDate(session.scheduled_at)
                                        : session.start
                                            ? (session.start === session.end ? formatDate(session.start) : `${formatDate(session.start)} - ${formatDate(session.end!)}`)
                                            : 'No date set'
                                    }
                                </p>
                                {session.actor_count > 0 && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {session.actor_count} actor{session.actor_count !== 1 ? 's' : ''}
                                    </p>
                                )}
                                {session.roles && session.roles.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {session.roles.map((role) => (
                                            <span
                                                key={role.id}
                                                className="px-2 py-0.5 text-xs bg-lime-100 text-lime-800 rounded-full"
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-2 text-sm text-gray-500">No sessions yet.</p>
            )}

            <h1 className="mt-4 mb-2 text-xl font-semibold">Notifications</h1>

            <div className="mb-3 space-y-2">
                <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-2 text-sm border border-gray-300 rounded-xl"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newNotification}
                        onChange={(e) => setNewNotification(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitNotification()}
                        placeholder="Write a notification..."
                        className="flex-1 p-2 text-sm border border-gray-300 rounded-xl"
                    />
                    <button
                        onClick={submitNotification}
                        className="w-8 h-8 flex items-center justify-center bg-lime-600 text-white rounded-full hover:bg-lime-700 text-lg font-bold"
                    >
                        +
                    </button>
                </div>
            </div>

            {notifications.length > 0 ? (
                <div className="space-y-2">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="m-2 p-2 text-sm text-black bg-white rounded-xl">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-xs text-lime-700">{notification.author_name}</p>
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-gray-300 hover:text-red-500 text-xs cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="mt-1">{notification.body}</p>
                            <p className="mt-1 text-xs text-gray-400">{formatDate(notification.created_at)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">No notifications yet.</p>
            )}
        </div>
    )
}

export default ProjectPageRight;
