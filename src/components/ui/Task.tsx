import { useState } from "react";

const Task = ({ label }: { label: string }) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <div className="flex items-center gap-2 p-2 rounded cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="w-4 h-4 rounded-full border-2 border-gray-400 checked:bg-purple-500 checked:border-purple-500 appearance-none cursor-pointer"
            />
                <span className={checked ? "line-through text-purple-400" : ""}>{label}</span>
        </div>
    );
};

export default Task;
