import React, { useState } from "react";

interface Task {
    id: number;
    name: string;
    priority: number;
}

interface Props {
    task: Task;
    index: number;
    onUpdateName: (id: number, name: string) => void;
    onDelete: (id: number, name: string) => void;
}

const TaskItem: React.FC<Props> = ({ task, index, onUpdateName, onDelete }) => {
    const [name, setName] = useState(task.name);

    const handleBlur = () => {
        if (name.trim() && name !== task.name) {
            onUpdateName(task.id, name);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.currentTarget.blur();
    };

    return (
        <li
            data-id={task.id}
            className="flex items-center space-x-3 bg-white px-4 py-3 text-sm transition-all duration-150 hover:bg-indigo-50"
        >
            <div className="task-item-handle flex items-center space-x-3 cursor-grab text-gray-400 hover:text-gray-700 transition duration-150">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <span className="font-medium text-xs rounded-full bg-gray-200 text-gray-700 w-5 h-5 flex items-center justify-center">
                    {index + 1}
                </span>
            </div>
            <input
                type="text"
                className="flex-grow border-0 focus:ring-0 text-gray-800 bg-transparent py-0 px-0 focus:shadow-none"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={() => onDelete(task.id, task.name)}
                className="no-drag text-xs px-3 py-1 font-semibold text-red-600 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 transition duration-150"
            >
                Delete
            </button>
        </li>
    );
};

export default TaskItem;
