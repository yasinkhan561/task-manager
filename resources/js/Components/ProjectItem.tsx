import React from "react";
import { Project } from "@/types/pages";
import { Link, router } from "@inertiajs/react";

interface Props {
    project: Project;
}

const ProjectItem: React.FC<Props> = ({ project }) => {
    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to delete project "${project.name}"?`
            )
        ) {
            router.delete(route("projects.destroy", project.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <tr className="hover:bg-indigo-50/50 transition duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {project.created_at
                    ? new Date(project.created_at).toLocaleDateString()
                    : "-"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <Link
                    href={route("tasks.index", { project: project.id })}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold transition duration-150"
                >
                    View
                </Link>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-900 font-semibold transition duration-150"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ProjectItem;
