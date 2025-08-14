import ProjectPageRoleItem from "./ProjectPageRoleItem";

const ProjectPageMiddle = () => {
    return (
        <div className="flex-1 p-4 shadow-xl">
            <h1 className="m-2 text-3xl font-semibold">Roles in this project</h1>
            <ProjectPageRoleItem />

            <ProjectPageRoleItem />

            <ProjectPageRoleItem />

            <ProjectPageRoleItem />
        </div>
    )
}

export default ProjectPageMiddle;