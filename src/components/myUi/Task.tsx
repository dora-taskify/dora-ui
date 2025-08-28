import { Check } from "lucide-react";

const Task = ({ label }: { label: string }) => {
  return (
    <label className="flex items-center gap-2 p-2 rounded cursor-pointer select-none">
      {/* Native input tapi hidden secara visual */}
      <input type="checkbox" className="peer hidden" />

      {/* Custom checkbox */}
      <div
        className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 
        peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-colors"
      >
        <Check size={14} className="hidden peer-checked:block text-white" />
      </div>

      {/* Label */}
      <span
        className="text-sm peer-checked:line-through peer-checked:text-purple-400 transition-colors"
      >
        {label}
      </span>
    </label>
  );
};

export default Task;
