import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { ProjectsPageProps } from "@/types/pages";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ProjectItem from "@/Components/ProjectItem";

const ProjectList: React.FC<ProjectsPageProps> = ({ auth, projects }) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("projects.store"), { onSuccess: () => reset("name") });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects Overview
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Add New Project
                        </h3>
                        <form
                            onSubmit={submit}
                            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <div className="flex-grow w-full max-w-lg">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full"
                                    placeholder="Enter Project Name (e.g., Q4 Strategy)"
                                    isFocused
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton
                                className="w-full sm:w-auto px-6 py-2.5 justify-center"
                                disabled={processing || !data.name}
                            >
                                + Add Project
                            </PrimaryButton>
                        </form>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 p-6">
                            Existing Projects ({projects.length})
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {projects.length > 0 ? (
                                        projects.map((project) => (
                                            <ProjectItem
                                                key={project.id}
                                                project={project}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                No projects found. Start by
                                                adding one above!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProjectList;
