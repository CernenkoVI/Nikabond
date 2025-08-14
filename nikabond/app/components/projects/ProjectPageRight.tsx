import ContactButton from "../ContactButton";
import Link from "next/link";

const ProjectPageRight = () => {
    return (
        <div className="my-2 w-full lg:w-[45vh] p-4 bg-lime-100 rounded-xl">
            <h1 className="mb-2 text-2xl font-semibold">Dates in this project</h1>


            <div className="space-y-1 text-sm">
                <div className="my-4 flex justify-between">
                    <span className="ml-2 font-medium">Shooting:</span>
                    <span className="ml-2 font-medium">25.Nov. - 25.Dec.</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Session:</span>
                    <span>25.Nov. - 25.Dec.</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Call-back:</span>
                    <span>25.Nov.</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Try-ons:</span>
                    <span>25.Nov. - 25.Dec.</span>
                </div>
                <div className="flex justify-between">
                    <span className="ml-2">Rehearsal:</span>
                    <span>25.Nov. - 25.Dec.</span>
                </div>
            </div>



            <h1 className="mt-4 mb-2 text-xl font-semibold">Notifications</h1>

            <div className="m-2 p-2 text-sm text-black bg-white rounded-xl">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </div>

            <div className="m-2 p-2 text-sm text-black bg-white rounded-xl">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </div>

        </div>
    )
}

export default ProjectPageRight;