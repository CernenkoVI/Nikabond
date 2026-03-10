'use client';

import { useEffect, useState } from 'react';
import AgentsListItem from "./AgentsListItem";
import apiService from '@/app/services/apiService';

export type AgentType = {
    id: string;
    name: string;
    description: string;
    image_url: string;
}

const AgentsList = () => {
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAgents = async () => {
        try {
            const tmpAgents = await apiService.get('/api/agents/');
            setAgents(tmpAgents.data);
        } catch (e) {
            setError('Failed to load agents.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAgents();
    }, []);

    if (loading) {
        return <p className="col-span-full text-center text-gray-500 py-10">Loading agents...</p>;
    }

    if (error) {
        return <p className="col-span-full text-center text-red-500 py-10">{error}</p>;
    }

    if (agents.length === 0) {
        return <p className="col-span-full text-center text-gray-500 py-10">No agents found.</p>;
    }

    return (
        <>
            {agents.map((agent) => {
                return(
                    <AgentsListItem
                        key={agent.id}
                        agent={agent}
                    />
                )
            })}
        </>
    )
}

export default AgentsList;
