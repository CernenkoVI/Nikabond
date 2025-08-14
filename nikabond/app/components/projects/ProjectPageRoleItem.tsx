import Link from "next/link";

const ProjectPageRoleItem = () => {
    return (
        <Link href="/roles/1">
            <div className="cursor-pointer m-2 p-2 bg-lime-100 rounded-xl">
                <p className="mt-2 text-sm font-semibold">Role</p>
                <p className="mb-3 text-sm">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
            </div>
        </Link>
    )
}

export default ProjectPageRoleItem;