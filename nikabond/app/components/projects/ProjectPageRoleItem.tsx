'use client';
import Image from "next/image";
import { RoleType } from "../mypage/MyRolesComponent"; 
import { useRouter } from "next/navigation";

interface RoleProps {
    role: RoleType
}

const ProjectPageRoleItem:React.FC<RoleProps> = ({ role }) => {
    const router = useRouter();
    return (
        <div
            className="p-5 mt-1 grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 items-center shadow-md cursor-pointer"
            onClick={() => router.push(`/roles/${role.id}`)} 
        >
            {/* Image column */}
            <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image
                        fill
                        src={role.image_url}
                        className="hover:scale-110 object-cover transition h-full w-full"
                        alt="Project pic"
                    />
                </div>
            </div>

            {/* Text content spans remaining columns */}
            <div className="col-span-4 md:col-span-6 lg:col-span-8 bg-lime-100 rounded-xl p-4">
                <p className="text-sm font-semibold">{role.name}</p>
                <p className="text-sm mt-2">{role.description}</p>
            </div>
        </div>
    )
}

export default ProjectPageRoleItem;
