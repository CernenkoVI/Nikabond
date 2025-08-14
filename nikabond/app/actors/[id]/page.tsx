import ActorsPageLeft from "@/app/components/actors/ActorsPageLeft";
import ActorsPageMiddle from "@/app/components/actors/ActorsPageMiddle";
import ActorsPageRight from "@/app/components/actors/ActorsPageRight";

const ActorDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                {/* Left Column: Image */}
                <ActorsPageLeft params={params} />

                {/* Middle Column: Details */}
                <ActorsPageMiddle params={params} />

                {/* Right Column: Agent Info */}
                <ActorsPageRight params={params} />
            </div>
        </main>
    );
};

export default ActorDetailPage;
