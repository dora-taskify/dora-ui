import { useState } from "react";
import Task from "@/components/ui/Task";

const List = ({ title }: { title: string }) => {
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState("");

    return (
        <div
            className="bg-white rounded-xl border border-zinc-300 p-4 flex-shrink-0 min-h-[100px] flex flex-col min-w-[260px]"
        >
            <h2 className="font-bold text-lg mb-4">{title}</h2>
            <div className="flex flex-col gap-2 mb-2">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-zinc-100 p-2 rounded cursor-pointer hover:bg-zinc-200"
                    >
                        {item}
                    </div>
                ))}
                <Task label="Ini task"/>
            </div>
        </div>
    );
};

export default List;