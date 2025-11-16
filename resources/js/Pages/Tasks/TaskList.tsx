import React, { useState, useEffect, useRef } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import Sortable from "sortablejs";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TaskItem from "@/Components/TaskItem";
import { Task } from "@/types";
import { TaskPageProps } from "@/types/pages";

const TasksList: React.FC<TaskPageProps> = ({
    projects,
    tasks: initialTasks,
    selectedProjectId,
    errors,
}) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const taskListRef = useRef<HTMLUListElement>(null);

    const {
        data: newTaskData,
        setData: setNewTaskData,
        post: postNewTask,
        processing: postingTask,
        reset: resetNewTaskForm,
    } = useForm({
        name: "",
        project_id: selectedProjectId,
    });

    useEffect(() => {
        setTasks(initialTasks);
        setNewTaskData("project_id", selectedProjectId);
    }, [initialTasks, selectedProjectId]);

    useEffect(() => {
        if (!taskListRef.current) return;

        if (taskListRef.current.sortable) {
            taskListRef.current.sortable.destroy();
        }

        taskListRef.current.sortable = new Sortable(taskListRef.current, {
            animation: 150,
            handle: ".task-item-handle",
            onEnd: (evt) => {
                if (!taskListRef.current) return;
                const newTasksOrder = Array.from(
                    taskListRef.current.children
                ).map((item, index) => ({
                    id: parseInt(item.getAttribute("data-id") || "0"),
                    priority: index + 1,
                }));

                setTasks((prevTasks) => {
                    const map = new Map(prevTasks.map((t) => [t.id, t]));
                    return newTasksOrder.map((t) => ({
                        ...map.get(t.id)!,
                        priority: t.priority,
                    }));
                });

                axios
                    .post(route("tasks.reorder"), { tasks: newTasksOrder })
                    .catch(() => router.reload());
            },
            filter: ".no-drag",
        });
    }, [tasks.length]);

    const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            route("dashboard", { project_id: e.target.value }),
            {},
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleNewTaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postNewTask(route("tasks.store"), {
            onSuccess: () => resetNewTaskForm("name"),
        });
    };

    const handleDeleteTask = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete task "${name}"?`)) {
            router.delete(route("tasks.destroy", id), { preserveScroll: true });
        }
    };

    const handleUpdateTaskName = (id: number, name: string) => {
        router.put(
            route("tasks.update", id),
            { name },
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => router.reload(),
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task Manager
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg border-b border-gray-200 bg-white p-6 shadow-md mb-6">
                        <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
                            <label
                                htmlFor="project-filter"
                                className="text-md font-semibold text-gray-700 sm:w-1/4"
                            >
                                Current Project:
                            </label>
                            <select
                                id="project-filter"
                                className="w-full sm:w-1/2 rounded-md border-gray-300 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={selectedProjectId}
                                onChange={handleProjectChange}
                                disabled={projects.length === 0}
                            >
                                {projects.length === 0 ? (
                                    <option value={0}>
                                        No Projects Available
                                    </option>
                                ) : (
                                    projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))
                                )}
                            </select>
                            <Link
                                href={route("projects.index")}
                                className="w-full sm:w-auto rounded-md bg-indigo-50 px-3 py-2 text-center text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 focus:ring-indigo-500"
                            >
                                Manage Projects
                            </Link>
                        </div>
                    </div>

                    {selectedProjectId ? (
                        <>
                            <div className="overflow-hidden rounded-lg border-b border-gray-200 bg-white p-6 shadow-md mb-6">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    Add New Task
                                </h3>
                                <form
                                    onSubmit={handleNewTaskSubmit}
                                    className="w-full"
                                >
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <TextInput
                                                id="task_name"
                                                type="text"
                                                name="name"
                                                className="block w-full"
                                                placeholder="Enter Task Name"
                                                value={newTaskData.name}
                                                onChange={(e) =>
                                                    setNewTaskData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="sm:col-span-3 flex items-center">
                                            <PrimaryButton
                                                type="submit"
                                                className="w-full sm:w-auto px-6 justify-center"
                                                disabled={
                                                    postingTask ||
                                                    !newTaskData.name
                                                }
                                            >
                                                + Create
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="overflow-hidden rounded-lg shadow-md">
                                <ul
                                    className="divide-y divide-gray-200"
                                    ref={taskListRef}
                                >
                                    {tasks.length > 0 ? (
                                        tasks.map((task, index) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                index={index}
                                                onUpdateName={
                                                    handleUpdateTaskName
                                                }
                                                onDelete={handleDeleteTask}
                                            />
                                        ))
                                    ) : (
                                        <li className="bg-white p-6 text-center text-gray-500">
                                            No tasks found for this project.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-lg bg-yellow-100 border border-yellow-300 p-6 text-center text-sm font-medium text-yellow-800 shadow-md">
                            Please select a project from the dropdown above, or
                            click **Manage Projects** to create your first one.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TasksList;
