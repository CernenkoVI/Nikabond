import Image from "next/image";
import AttachedMediaButton from "../AttachedMediaButton";

const ProjectPageLeft = () => {
    return (
        <div className="my-2 flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            {/* Left Column: Image */}
            <div className="flex flex-col items-center w-full lg:w-[48vh]">

                <div className="flex flex-col items-center p-6 rounded-xl bg-lime-100 border border-lime-300 shadow-xl">

                    <h1 className="mb-2 text-2xl font-semibold">Mega Project</h1>

                    <Image
                        src="/project.png"
                        width={200}
                        height={200}
                        alt="Project pic"
                        className="mb-2 rounded-xl"
                    />

                    <p className="my-3 text-sm font-semibold opacity-80">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                    <p className="text-lg font-semibold opacity-80">Attached media:</p>

                    <AttachedMediaButton />
                </div>
            </div>
        </div>
    )
}

export default ProjectPageLeft;