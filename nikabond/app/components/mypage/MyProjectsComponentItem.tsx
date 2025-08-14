import Image from "next/image";

const MyProjectsComponentItem = () => {
    return (
        <div className="p-5 mt-1 grid grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 items-center shadow-md">
            <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image
                        fill
                        src="/project.png"
                        className="hover:scale-110 object-cover transition h-full w-full"
                        alt="Project pic"
                    />
                </div>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-8 space-y-2 bg-lime-100 rounded-xl">
                <h2 className="text-xl">Mega project</h2>
                <p><strong>22.Nov.-25.Dec.</strong></p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
            </div>
        </div>
        
    )
}

export default MyProjectsComponentItem;