import ActorsPageLeft from "@/app/components/actors/ActorsPageLeft";
import ActorsPageMiddle from "@/app/components/actors/ActorsPageMiddle";
import ActorsPageRight from "@/app/components/actors/ActorsPageRight";
import ActorEditButton from "@/app/components/actors/ActorEditButton";
import apiService from "@/app/services/apiService";

const ActorDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const actor = await apiService.get(`/api/actors/${id}`);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold">{actor.name}</h1>
                <ActorEditButton actorId={id} actorData={actor} />
            </div>
            <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                {/* Left Column: Image */}
                <ActorsPageLeft actor={actor} />

                {/* Middle Column: Details */}
                <ActorsPageMiddle actor={actor} />

                {/* Right Column: Agent Info */}
                <ActorsPageRight actor={actor} />
            </div>
        </main>
    );
};

export default ActorDetailPage;
