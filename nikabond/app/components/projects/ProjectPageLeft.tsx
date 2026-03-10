import Image from "next/image";
import AttachedMediaButton from "../AttachedMediaButton";
import ProjectEditButton from "./ProjectEditButton";

import apiService from "@/app/services/apiService";

const ProjectPageLeft = async ({ id }: { id: string }) => {
    const project = await apiService.get(`/api/projects/${id}`);
    return (
        <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            {/* Left Column: Image */}
            <div className="flex flex-col items-center w-full lg:w-[48vh]">

                <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">

                    <div className="flex items-center space-x-2">
                        <h1 className="mb-2 text-2xl font-semibold">{project.name}</h1>
                        <ProjectEditButton projectId={id} projectData={project} />
                    </div>

                    <Image
                        src={project.image_url}
                        width={200}
                        height={200}
                        alt="Project pic"
                        className="mb-2 rounded-xl"
                    />

                    <p className="my-3 text-sm font-semibold opacity-80">{project.description}</p>
                    <p className="text-lg font-semibold opacity-80">Attached media:</p>

                    <AttachedMediaButton />
                </div>
            </div>
        </div>
    )
}

export default ProjectPageLeft;