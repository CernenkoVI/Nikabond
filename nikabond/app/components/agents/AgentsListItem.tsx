import Image from "next/image";
import { AgentType } from "./AgentsList";
import { useRouter } from "next/navigation";

interface AgentProps {
    agent: AgentType
}

const AgentsListItem: React.FC<AgentProps> = ({
    agent
}) => {
    const router = useRouter();

    return (
        <div
            className="mx-2 cursor-pointer shadow-xl bg-lime-100 rounded-xl p-2 w-20"
            onClick= {() => router.push(`/agents/${agent.id}`)} 
        >
            <div className="relative w-8 h-8 overflow-hidden aspect-square rounded-xl">
                <Image
                    src={agent.image_url}
                    width={32}
                    height={32}
                    className="hover:scale-110 object-cover transition"
                    alt='Agent image'
                    priority
                />
            </div>

            <div className="mt-2 ml-2">
                <p className="text-sm font-semibold ">{agent.name}</p>
            </div>
        </div>
    )
}

export default AgentsListItem;