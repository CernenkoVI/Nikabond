import Image from "next/image";
import Link from "next/link";
import ActorsList from "@/app/components/actors/ActorsList";
import AttachedMediaButton from "@/app/components/AttachedMediaButton";
import apiService from "@/app/services/apiService";

const RoleDetailPage = async ({params}: {params: {id: string}}) => {
    const { id } = await params;
    const role = await apiService.get(`/api/roles/${id}`);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">

                        <h1 className="mb-2 text-2xl font-semibold">{role.name}</h1>

                        <Image
                            src={role.image_url}
                            width={200}
                            height={200}
                            alt="Role pic"
                            className="mb-2 rounded-full"
                        />

                        <p className="mb-y text-sm font-semibold opacity-70">{role.description}</p>


                        <div className="mt-4 flex items-center space-x-2">
                            <p className="text-lg font-semibold opacity-80">Project</p>
                            <Link href={`/projects/${role.project.id}`}>
                                <div className="cursor-pointer p-1">
                                    <img
                                        src={role.project.image_url}
                                        alt="Role pic"
                                        className="w-[58px] h-[58px] min-w-[58px] rounded-xl"
                                    />
                                </div>

                            </Link>
                        </div>




                        <p className="mt-2 text-lg font-semibold opacity-80">Attached media:</p>
                        <AttachedMediaButton />

                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl:6">
                    <h1 className="m-2 text-2xl font-semibold">Actors selection</h1>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
                        <ActorsList />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RoleDetailPage;