import Task from "@/components/myUi/Task";
import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type ListProps = {
    id: number;
    name: string;
    tasks?: string[]; // opsional: array task
    onEdit?: (id: number, name: string, description: string) => void;
    onArchive?: (id: number) => void;
    onDelete?: (id: number) => void;
    onAddTask?: (id: number) => void;
};

const ListBoard: React.FC<ListProps> = ({
    id,
    name,
    tasks = [],
    onEdit,
    onArchive,
    onAddTask,
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    
    return (
        <div className="flex flex-col gap-2 w-64">
            {/* Header List */}
            <div className="flex justify-between items-center px-2">
                <p className="font-bold text-lg">{name}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="cursor-pointer hover:text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem onClick={() => setOpenDialog(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {e.stopPropagation(); onArchive?.(Number(id));}}>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="bg-white rounded-xl border border-zinc-300 p-4 flex flex-col gap-2">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => <Task key={index} label={task} />)
                ) : (
                    <p className="text-gray-400 text-sm">No tasks yet</p>
                )}

            </div>
            <button
                onClick={() => onAddTask?.(id)}
                className="mt-2 text-sm text-purple-500 hover:underline text-left"
            >
                + Add Task
            </button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit List</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <form className="flex flex-col gap-3" onSubmit={(e) => {
                                        e.preventDefault()
                                        onEdit?.(Number(id), editName, editDescription)}}>
                            <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="List name"
                            />
                            <Textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                                    Cancel
                                </Button>
                                <Button>Save</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListBoard;