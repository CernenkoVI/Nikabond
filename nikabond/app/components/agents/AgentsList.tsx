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

    const getAgents = async () => {
        const tmpAgents = await apiService.get('/api/agents/')

        setAgents(tmpAgents.data);
    };

    useEffect(() => {
        apiService.get('/api/agents/');
        getAgents();
    }, []);

    return (
        <div className="flex flex-row items-center">
            {agents.map((agent) => {
                return(
                    <AgentsListItem
                        key={agent.id}
                        agent={agent}
                    />
                )
            })}            
        </div>
    )
}

export default AgentsList;
