import AgentsList from "../components/agents/AgentsList";

export default function AgentsPage() {
    return (
        <main className="max-w-[1500px] mx-auto px-6">
            <h1 className="mt-4 mb-4 text-2xl font-semibold">Agents</h1>

            <div className="mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
                <AgentsList />
            </div>
        </main>
    );
}
