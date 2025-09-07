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
    description: string;
    onEdit?: (id: number, name: string, description: string) => void;
    onArchive?: (id: number) => void;
    onDelete?: (id: number) => void;
    onAddTask?: (id: number) => void;
};

const ListBoard: React.FC<ListProps> = ({
    id,
    name,
    description,
    onEdit,
    onArchive,
}) => {
    const {id: boardId} = useParams()
    const { handleCreateTask, taskName, setTaskName, setTaskDescription, taskDescription, tasks, handleDeleteTask, handleUpdateTask, priority, setPriority, deadline, setDeadline } = useTask(Number(boardId), id)
    const [openDialog, setOpenDialog] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showInput, setShowInput] = useState(false)

    return (
        <div className="flex flex-col gap-2 w-64">
            {/* Header List */}
            <div className="flex justify-between items-center px-2">
                <div className="items-center max-w-[200px]">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="truncate text-sm">{description}</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="cursor-pointer hover:text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem onClick={() => {
                            setOpenDialog(true)
                            setEditName(name); 
                            setEditDescription(description ?? "")
                        }}>Edit</DropdownMenuItem>
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
                                listId={id}
                                name={task.name}
                                priority={task.priority}
                                deadline={task.deadline}
                                description={task.description}
                                onUpdate={({ id, name, description, priority }) => handleUpdateTask(id, name, description, priority)}
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
                            onSubmit={(e) => {
                            handleCreateTask(e);
                            setShowInput(false);
                            }}
                            className="flex flex-col gap-4"
                        >
                            {/* Task Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 px-1">Task Name</label>
                                <Input
                                    type="text"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    placeholder="Your task here..."
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 px-1">Description</label>
                                <Textarea
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    placeholder="Description task..."
                                    required
                                />
                            </div>

                            {/* Priority */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 px-1">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="border rounded-lg px-3 py-2 text-sm text-zinc-700 focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>

                            {/* Deadline */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700 px-1">Deadline</label>
                                <Input 
                                    type="date"
                                    value={deadline ? deadline.toISOString().split("T")[0] : ""}
                                    onChange={(e) => setDeadline(new Date(e.target.value))}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowInput(false)}
                                className="bg-secondary rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-secondary-shade transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-primary rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-primary-shade transition"
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
                                <Button className="text-white bg-primary">Save</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListBoard;