import Image from "next/image";
import ActorsListItem from "@/app/components/actors/ActorsListItem";
import apiService from "@/app/services/apiService";

const AgentDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const { id } = await params;
    const agent = await apiService.get(`/api/agents/${id}`)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">

                        <h1 className="mb-2 text-2xl font-semibold">{agent.name}</h1>

                        <Image
                            src={agent?.image_url}
                            width={200}
                            height={200}
                            alt={agent.name}
                            className="mb-2 rounded-full"
                        />

                        <p className="mb-y text-sm font-semibold opacity-70">{agent.description}</p>
                        <p className="mb-y text-sm font-semibold opacity-70">{agent.email}</p>
                        <p className="mb-y text-sm font-semibold opacity-70">{agent.phone}</p>

                        { /* <ContactButton /> */ }

                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <h1 className="m-2 text-2xl font-semibold">Related actors</h1>

                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                        {agent.actors && agent.actors.length > 0 ? (
                            agent.actors.map((actor: { id: string; name: string; description: string; image_url: string }) => (
                                <ActorsListItem
                                    key={actor.id}
                                    actor={actor}
                                />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-10">No related actors found.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AgentDetailPage;
