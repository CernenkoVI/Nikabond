import ContactButton from "@/app/components/ContactButton";
import Image from "next/image";
import ActorsList from "@/app/components/actors/ActorsList";

const AgentDetailPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">

                        <h1 className="mb-2 text-2xl font-semibold">Agent Smith</h1>

                        <Image
                            src="/agent.png"
                            width={200}
                            height={200}
                            alt="Agent pic"
                            className="mb-2 rounded-full"
                        />

                        <p className="mb-y text-sm font-semibold opacity-70">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

                        <div className="flex items-center space-x-2">
                            <p><strong>Agency</strong></p>
                            <div className="cursor-pointer p-1">
                                <img
                                    src="/logo1.png"
                                    alt="Agency pic"
                                    className="w-[58px] h-[58px] min-w-[58px] rounded-full"
                                />
                            </div>
                        </div>

                        <ContactButton />

                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl:6">
                    <h1 className="m-2 text-2xl font-semibold">Related actors</h1>

                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                        <ActorsList />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AgentDetailPage;