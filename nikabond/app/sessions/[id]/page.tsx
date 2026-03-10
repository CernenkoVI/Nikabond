import Link from "next/link";
import apiService from "@/app/services/apiService";
import ProjectPageRoleItem from "@/app/components/projects/ProjectPageRoleItem";
import SessionEditButton from "@/app/components/sessions/SessionEditButton";

const SessionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const session = await apiService.get(`/api/sessions/${id}/`);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">
                        <div className="flex items-center space-x-2">
                            <h1 className="mb-2 text-2xl font-semibold">{session.name}</h1>
                            <SessionEditButton sessionId={id} sessionData={session} />
                        </div>
                        <p className="mb-2 text-sm font-semibold opacity-70">{session.description}</p>

                        <div className="mt-2 w-full space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Start:</span>
                                <span>{session.start}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">End:</span>
                                <span>{session.end}</span>
                            </div>
                        </div>

                        {session.project && (
                            <div className="mt-4 flex items-center space-x-2">
                                <p className="text-lg font-semibold opacity-80">Project</p>
                                <Link href={`/projects/${session.project.id}`}>
                                    <div className="cursor-pointer p-1">
                                        <img
                                            src={session.project.image_url}
                                            alt="Project pic"
                                            className="w-[58px] h-[58px] min-w-[58px] rounded-xl"
                                        />
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <h1 className="m-2 text-2xl font-semibold">Assigned Roles</h1>
                    {session.roles && session.roles.length > 0 ? (
                        <div>
                            {session.roles.map((role: any) => (
                                <ProjectPageRoleItem key={role.id} role={role} />
                            ))}
                        </div>
                    ) : (
                        <p className="m-2 text-sm text-gray-500">No roles assigned to this session.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default SessionDetailPage;
