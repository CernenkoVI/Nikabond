import ProjectPageLeft from "@/app/components/projects/ProjectPageLeft";
import ProjectPageMiddle from "@/app/components/projects/ProjectPageMiddle";
import ProjectPageRight from "@/app/components/projects/ProjectPageRight";

const ProjectDetailPage = () => {
    return (
        <main className="max-w-[1500px] mx-auto px-6 pt-3">
            <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                {/* Left Column: Image */}
                <ProjectPageLeft/>

                {/* Middle Column: Roles */}
                <ProjectPageMiddle/>

                {/* Right Column: Dates */}
                <ProjectPageRight/>
            </div>
        </main>
    );
};

export default ProjectDetailPage;
