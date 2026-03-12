'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

type ActorType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
};

type CollectionDetail = {
    id: string;
    name: string;
    description: string;
    actors: ActorType[];
};

const CollectionDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [collection, setCollection] = useState<CollectionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const fetchCollection = async () => {
        setLoading(true);
        try {
            const data = await apiService.get(`/api/collections/${id}/`);
            setCollection(data);
        } catch {
            setError('Failed to load collection.');
        } finally {
            setLoading(false);
        }
    };

    const removeActor = async (actorId: string) => {
        if (!collection) return;
        const remaining = collection.actors.filter((a) => a.id !== actorId).map((a) => a.id);
        const formData = new FormData();
        remaining.forEach((aid) => formData.append('actors', aid));

        try {
            await apiService.post(`/api/collections/${id}/update-actors/`, formData);
            setCollection({
                ...collection,
                actors: collection.actors.filter((a) => a.id !== actorId),
            });
        } catch {
            console.log('Failed to remove actor');
        }
    };

    const deleteCollection = async () => {
        try {
            await apiService.post(`/api/collections/${id}/delete/`, new FormData());
            router.push('/');
        } catch {
            console.log('Failed to delete collection');
        }
    };

    useEffect(() => {
        fetchCollection();
        getUserId().then(setUserId);
    }, [id]);

    if (loading) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pt-3">
                <p className="text-gray-500 py-10 text-center">Loading collection...</p>
            </main>
        );
    }

    if (error || !collection) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pt-3">
                <p className="text-red-500 py-10 text-center">{error || 'Collection not found.'}</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push(`/mypage/${userId}?section=collections`)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold">{collection.name}</h1>
                        {collection.description && (
                            <p className="text-sm text-gray-500 mt-1">{collection.description}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {collection.actors.length} actor{collection.actors.length !== 1 ? 's' : ''}
                    </span>
                    <button
                        onClick={deleteCollection}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {collection.actors.length === 0 ? (
                <p className="text-gray-500 py-10 text-center">No actors in this collection yet.</p>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                    {collection.actors.map((actor) => (
                        <div key={actor.id} className="mb-5 mx-2 shadow-xl bg-lime-100 rounded-xl group relative">
                            <Link href={`/actors/${actor.id}`}>
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image
                                        fill
                                        src={actor.image_url}
                                        sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt={actor.name}
                                    />
                                </div>
                                <div className="mt-2 ml-2">
                                    <p className="text-lg font-bold">{actor.name}</p>
                                </div>
                                <div className="mb-2 ml-2">
                                    <p className="text-sm line-clamp-2">{actor.description}</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => removeActor(actor.id)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/90 rounded-full p-1.5 text-gray-400 hover:text-red-500 transition-all shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default CollectionDetailPage;
