import Task from "@/components/myUi/Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    prio?: string;
    sort?: "asc" | "desc"
    refetchTrigger?: number;
};

const ListBoard: React.FC<ListProps> = ({
    id,
    name,
    description,
    onEdit,
    onArchive,
    prio,
    sort,
    refetchTrigger
}) => {
    const { id: boardId } = useParams();
    const { handleCreateTask, taskName, setTaskName, setTaskDescription, taskDescription, tasks, handleDeleteTask, handleUpdateTask, priority, setPriority, deadline, setDeadline, fetchTask } = useTask(Number(boardId), id, refetchTrigger, prio, sort);
    const [openDialog, setOpenDialog] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        fetchTask(prio, sort);
    }, [prio, sort, refetchTrigger]);

    return (
        <div className="flex flex-col gap-2 w-72 rounded-xl bg-zinc-50 border border-zinc-200 shadow-sm">
            <div className="flex justify-between items-start px-3 py-2 border-b border-zinc-200 bg-white rounded-t-xl">
                <div className="flex flex-col max-w-[180px]">
                    <p className="font-semibold text-base text-zinc-800">{name}</p>
                    {description && (
                        <p className="truncate text-xs text-zinc-500">{description}</p>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="cursor-pointer text-zinc-500 hover:text-zinc-700" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem
                            onClick={() => {
                                setOpenDialog(true);
                                setEditName(name);
                                setEditDescription(description ?? "");
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            onArchive?.(Number(id));
                        }}>
                            Archive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Droppable droppableId={String(id)} type="TASK">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col gap-2 min-h-[60px] px-3 py-2"
                    >
                        {tasks.length > 0 ? (
                            tasks.map((task: any, index: number) => (
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
                                                onUpdate={({ id, name, description, priority }) =>
                                                    handleUpdateTask(id, name, description, priority)
                                                }
                                                onDelete={(id) => handleDeleteTask(id)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        ) : (
                            <div className="border border-dashed rounded-lg border-zinc-300 h-14 flex items-center justify-center text-zinc-400 text-sm">
                                No tasks yet
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Add Task */}
            <div className="px-3 pb-3">
                {showInput ? (
                    <div className="bg-white rounded-xl border border-zinc-200 p-3 shadow-sm">
                        <form
                            onSubmit={(e) => {
                                handleCreateTask(e);
                                setShowInput(false);
                            }}
                            className="flex flex-col gap-3"
                        >
                            <Input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Task name..."
                                required
                            />
                            <Textarea
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                placeholder="Description..."
                                required
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm text-zinc-700"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                            <Input
                                type="date"
                                value={deadline ? deadline.toISOString().split("T")[0] : ""}
                                onChange={(e) => setDeadline(new Date(e.target.value))}
                                min={new Date().toISOString().split("T")[0]}
                            />
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    onClick={() => setShowInput(false)}
                                    className="bg-secondary text-white"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-primary text-white">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowInput(true)}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        + Add Task
                    </button>
                )}
            </div>

            {/* Edit Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit List</DialogTitle>
                    </DialogHeader>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onEdit?.(Number(id), editName, editDescription);
                            setOpenDialog(false);
                        }}
                    >
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
                            <Button className="bg-primary text-white">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListBoard;
