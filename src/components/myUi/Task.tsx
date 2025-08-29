import type React from "react";

type TaskProps = {
    id: number;
    name: string;
    description: string;
    onDelete?: (id: number) => void;
};

const Task: React.FC<TaskProps> = ({ id, name,  onDelete, description }) => {
    return (
        <div
            key={id}
            className="bg-white rounded-xl border border-zinc-300 p-4 cursor-grab hover:shadow-sm"
        >
            <div className="mb-2">
                <span className="p-2 font-semibold">{name}</span>
            </div>
            <div className="border-zinc-300 border rounded-md min-h-16">
                <p className="text-stone-400 p-2 text-sm">{description}</p>
            </div>
        </div>
    );
};

export default Task;