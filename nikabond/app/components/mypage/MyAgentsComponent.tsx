'use client';

import { useState, useEffect } from "react";
import AgentsList, { AgentType } from "../agents/AgentsList";
import apiService from "@/app/services/apiService";
const MyAgentsComponent = () => {
    const [agents, setAgents] = useState<AgentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAgents = async () => {
        try {
            const response = await apiService.get("/api/agents/");
            setAgents(response.data as AgentType[]);
        } catch (err: any) {
            console.error("Error fetching agents:", err);
            setError("Failed to load agents.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAgents();
    }, []);

    return (
        <div>
            <div className="p-5 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 shadow-md border border-gray-300 rounded-xl">
                <AgentsList />
            </div>
        </div>
    );
};

export default MyAgentsComponent;
