'use client';

import { useEffect, useState } from "react";
import MyCollectionsComponentItem from "./MyCollectionsComponentItem";
import apiService from "@/app/services/apiService";
import { getAccessToken } from "@/app/lib/actions";

type CollectionType = {
    id: string;
    name: string;
    description: string;
    actors_count: number;
};

const MyCollectionsComponent = () => {
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCollections = async () => {
        setLoading(true);
        try {
            const token = await getAccessToken();
            if (!token) {
                setCollections([]);
                setLoading(false);
                return;
            }
            const res = await apiService.get('/api/collections/');
            setCollections(res.data || []);
        } catch {
            setCollections([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    if (loading) {
        return <p className="text-sm text-gray-500 py-4">Loading collections...</p>;
    }

    if (collections.length === 0) {
        return <p className="text-sm text-gray-500 py-4">No collections yet. Select actors from the home page to create one.</p>;
    }

    return (
        <div className="space-y-2">
            {collections.map((collection) => (
                <MyCollectionsComponentItem
                    key={collection.id}
                    id={collection.id}
                    name={collection.name}
                    description={collection.description}
                    actorsCount={collection.actors_count}
                    onDeleted={fetchCollections}
                />
            ))}
        </div>
    );
};

export default MyCollectionsComponent;
