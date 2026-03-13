import Link from "next/link";
import apiService from "@/app/services/apiService";
import SessionEditButton from "@/app/components/sessions/SessionEditButton";
import SessionActorsList from "@/app/components/sessions/SessionActorsList";
import StatusBadge from "@/app/components/StatusBadge";

const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return 'Not scheduled';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    } catch {
        return dateStr;
    }
};

const SessionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const session = await apiService.get(`/api/sessions/${id}/`);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">
                        <div className="flex items-center space-x-2">
                            <h1 className="mb-2 text-2xl font-semibold">{session.title || session.name}</h1>
                            <SessionEditButton sessionId={id} sessionData={session} />
                        </div>

                        <StatusBadge status={session.status || 'draft'} className="mb-3" />

                        {session.notes && (
                            <p className="mb-2 text-sm font-semibold opacity-70">{session.notes}</p>
                        )}

                        <div className="mt-2 w-full space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Scheduled:</span>
                                <span>{formatDateTime(session.scheduled_at)}</span>
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

                        {session.roles && session.roles.length > 0 && (
                            <div className="mt-4 w-full">
                                <p className="text-sm font-semibold mb-2">Roles in this session</p>
                                <div className="space-y-1">
                                    {session.roles.map((role: any) => (
                                        <Link key={role.id} href={`/roles/${role.id}`}>
                                            <div className="p-2 bg-white rounded-lg text-sm hover:bg-lime-50 cursor-pointer">
                                                {role.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <SessionActorsList
                        sessionId={id}
                        roles={session.roles || []}
                    />
                </div>
            </div>
        </main>
    );
};

export default SessionDetailPage;
