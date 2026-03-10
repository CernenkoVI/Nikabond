import Image from "next/image";
import { ProjectType } from "./MyProjectsComponent";
import { useRouter } from "next/navigation";

interface ProjectProps {
    project: ProjectType
}

const MyProjectsComponentItem:React.FC<ProjectProps> = ({
    project
}) => {
    const router = useRouter();
    return (
        <div
            className="cursor-pointer p-5 mt-1 grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 items-center shadow-md"
            onClick= {() => router.push(`/projects/${project.id}`)} 
        >
            <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image
                        fill
                        src={project.image_url}
                        className="hover:scale-110 object-cover transition h-full w-full"
                        alt="Project pic"
                    />
                </div>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-8 space-y-2 p-4 bg-lime-100 rounded-xl">
                <h2 className="text-xl">{project.name}</h2>
                <p><strong>{`${project.shooting_start}`}</strong> thru <strong>{`${project.shooting_end}`}</strong></p>
                <p>{project.description}</p>
            </div>
        </div>
        
    )
}

export default MyProjectsComponentItem;
