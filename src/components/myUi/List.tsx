import Task from "@/components/myUi/Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
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
import useTask from "@/hooks/useTasks";
import { useParams } from "react-router-dom";

type ListProps = {
    id: number;
    name: string;
    onEdit?: (id: number, name: string, description: string) => void;
    onArchive?: (id: number) => void;
    onDelete?: (id: number) => void;
    onAddTask?: (id: number) => void;
};

const ListBoard: React.FC<ListProps> = ({
    id,
    name,
    onEdit,
    onArchive,
}) => {
    const {id: boardId} = useParams()
    const { handleCreateTask, taskName, setTaskName, setTaskDescription, taskDescription, tasks, handleDeleteTask, handleUpdateTask } = useTask(Number(boardId), id)
    const [openDialog, setOpenDialog] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showInput, setShowInput] = useState(false)

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
            <Droppable droppableId={String(id)} type="TASK">
                {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-2 min-h-[50px] rounded-lg p-2"
                >
                    {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <Task
                                id={task.id}
                                name={task.name}
                                description={task.description}
                                onUpdate={({ id, name, description }) => handleUpdateTask(id, name, description)}
                                onDelete={(id) => handleDeleteTask(id)}
                            />
                            </div>
                        )}
                        </Draggable>
                    ))
                    ) : (
                    <div className="border rounded-lg border-zinc-300 h-14 flex items-center justify-center">
                        <p className="text-gray-400 text-md text-center">No tasks yet</p>
                    </div>
                    )}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            <div>
                {showInput ? (
                    <div className="bg-white rounded-xl border border-zinc-300 p-4">
                        <form 
                            onSubmit={handleCreateTask}
                            className="flex flex-col gap-2"
                        >
                            <Input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="your task here..."
                            />
                            <Textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="description task..."
                            />
                            <div className="flex gap-2 justify-end mt-2">
                                <button
                                    onClick={() => setShowInput(false)}
                                    className="bg-secondary rounded-lg px-2 py-1 text-white cursor-pointer hover:bg-secondary-shade"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary rounded-lg px-2 py-1 text-white cursor-pointer hover:bg-primary-shade"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowInput(true)}
                        className="mt-2 flex ml-4 text-sm text-primary hover:underline cursor-pointer"
                    >
                        + Add Task
                    </button>
                )}
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit List</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); onEdit?.(Number(id), editName, editDescription)}}>
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