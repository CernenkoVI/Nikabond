import Image from "next/image";
import Link from "next/link";
import { AgentType } from "./AgentsList";

interface AgentProps {
    agent: AgentType
}

const AgentsListItem: React.FC<AgentProps> = ({
    agent
}) => {
    return (
        <Link
            href={`/agents/${agent.id}`}
            className="mb-5 mx-2 cursor-pointer shadow-xl bg-lime-100 rounded-xl"
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={agent.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={agent.name}
                />
            </div>

            <div className="mt-2 ml-2">
                <p className="text-lg font-bold line-clamp-1">{agent.name}</p>
            </div>

            <div className="mb-2 ml-2">
                <p className="text-sm line-clamp-2">{agent.description}</p>
            </div>
        </Link>
    )
}

export default AgentsListItem;
