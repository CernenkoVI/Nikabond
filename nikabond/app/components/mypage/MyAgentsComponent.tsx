'use client';

import { useState, useEffect } from "react";
import AgentsList, { AgentType } from "../agents/AgentsList";
import apiService from "@/app/services/apiService";
import useAddAgentModal from "../hooks/useAddAgentModal";

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

    const addAgentModal = useAddAgentModal();

    const addAgent = () => {
        addAgentModal.open()
    }

    return (
        <div>
            <div className="flex justify-end mb-2">
                <button
                    onClick={addAgent}
                    className="cursor-pointer text-lime-500 hover:text-lime-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                </button>
            </div>

            <div className="p-5 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 shadow-md border border-gray-300 rounded-xl">
                <AgentsList />
            </div>
        </div>
    );
};

export default MyAgentsComponent;
