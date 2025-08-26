import Sidebar from "@/components/Sidebar"
import { useState } from "react"
import List from "@/components/ui/List"
import { Plus, Trash } from "lucide-react"

const TaskPage = () => {
    const [open, setOpen] = useState(true)
    return (
        <div className="flex h-screen bg-white text-start">
            <Sidebar open={open} setOpen={setOpen} />
            <div
                className={`flex-1 transition-all duration-300 overflow-x-auto overflow-y-hidden
                ${open ? "pl-70" : "pl-20"}`}
            >
                <div className="place-items-start cursor-pointer mb-6 px-2 flex gap-2 hover:text-red-500 font-semibold transition">
                    <Trash className=""/>
                    Delete Board
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        <List title="To Do" />
                        <button
                            className="cursor-pointer flex gap-2 text-start text-zinc-400 rounded hover:text-purple-400"
                        >
                            <Plus width={20}/>
                            Add task
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <List title="In Progress" />
                            <button
                            className="cursor-pointer flex gap-2 text-start text-zinc-400 rounded hover:text-purple-400"
                        >
                            <Plus width={20}/>
                            Add task
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <List title="Done" />
                        <button
                            className="cursor-pointer flex gap-2 text-start text-zinc-400 rounded hover:text-purple-400"
                        >
                            <Plus width={20}/>
                            Add task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskPage