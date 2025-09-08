import type React from "react";
import DialogModal from "@/components/myUi/DialogModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Item from "@/components/myUi/Item";
import useItem from "@/hooks/useItem";
import { useParams } from "react-router-dom";


type TaskProps = {
    id: number;
    name: string;
    listId: number;
    description: string;
    priority: string;
    deadline: string;
    onUpdate?: (task: {id: number, name: string, description: string, priority: string}) => void;
    onDelete?: (id: number) => void;
};

const Task: React.FC<TaskProps> = ({ id, listId, name, description, priority, deadline, onUpdate, onDelete }) => {
    const { id: boardId } = useParams()
    const { items, content, setContent, createItems, updateItem, toggleItem, deleteItem } = useItem(Number(boardId), listId, id)
    const [showAddItem, setShowAddItem] = useState(false)
    const [showInputDescription, setShowInputDescription] = useState(false)
    const [showInputTitle, setShowInputTitle] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newPriority, setNewpriority] = useState(priority)
    const [newDescription, setNewDescription] = useState(description)

    const getPriorityStyle = (priority: string) => {
        switch (priority.toLowerCase()) {
            case "low":
                return "bg-green-100";
            case "medium":
                return "bg-blue-100";
            case "high":
                return "bg-orange-100";
            case "critical":
                return "bg-red-100";
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        return d.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };
            
    return (
        <DialogModal
            trigger={
            <div
                key={id}
                className="bg-white rounded-xl border border-zinc-300 p-4 cursor-grab hover:shadow-sm"
            >
                <div className="mb-2 flex justify-between items-center">
                    <span className="p-2 font-medium text-primary">{name}</span>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityStyle(priority)}`}
                    >
                        {priority}
                    </span>
                </div>
                <div>
                    <p className="p-2 text-sm text-primary-shade truncate">{description}</p>
                </div>
                {deadline && (
                <div className="mt-2">
                    <p className="text-sm px-2 text-primary">
                        deadline: {formatDate(deadline)}
                    </p>
                </div>
                )}
            </div>}
        >
            <div>
                {showInputTitle ? (
                    <form 
                        className="space-y-2 mb-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            onUpdate?.({ id, name: newName, description: newDescription, priority: newPriority })
                            setShowInputTitle(false)
                        }}
                    >
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border-zinc-300"
                        />

                        <label className="text-sm font-medium text-zinc-700 px-1">Priority</label>
                            <select
                                value={newPriority}
                                className="border rounded-lg px-3 py-2 text-sm text-zinc-700 focus:ring-2 focus:ring-primary focus:outline-none"
                                onChange={(e) => setNewpriority(e.target.value)}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                        </select>

                        <div className="flex gap-2">
                            <Button type="submit" className="text-white bg-primary hover:bg-primary-shade cursor-pointer">Submit</Button>
                            <Button type="button" onClick={() => setShowInputTitle(false)} className="bg-secondary cursor-pointer text-white hover:bg-secondary-shade">
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="flex justify-between">
                        <div onClick={() => setShowInputTitle(true)} className="cursor-pointer mb-6 hover:bg-zinc-100 rounded-sm">

                            <p className="font-medium text-2xl px-2">{name}</p>
                            <span
                                className={`text-xs font-semibold px-4 py-1 rounded-full ${getPriorityStyle(priority)}`}
                            >
                                {priority}
                            </span>

                        </div>
                        <div className="relative">
                            <Trash width={20} color="red" className="hover:bg-zinc-100 rounded-sm cursor-pointer" onClick={() => setShowDelete(true)}/>
                            {showDelete && (
                                <div className="absolute top-6 -right-42 mt-2 bg-white border-zinc-200 p-4 rounded-lg shadow-md w-48 z-50">
                                    <p className="text-sm mb-2">Are you sure you want to delete this task?</p>
                                    <div className="flex gap-2 justify-end">
                                        <Button onClick={() => setShowDelete(false)} className="bg-secondary hover:bg-secondary-shade cursor-pointer text-white">
                                            Cancel
                                        </Button>
                                        <Button
                                            className="bg-primary text-white hover:bg-primary-shade cursor-pointer"
                                            onClick={() => {
                                            onDelete?.(Number(id));
                                            setShowDelete(false);
                                            }}
                                        >
                                            Okay
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div>
                {showInputDescription ? (
                    <form
                        className="flex flex-col gap-3 mb-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            onUpdate?.({ id, name: newName, description: newDescription, priority: newPriority })
                            setShowInputDescription(false)

                        }}
                    >
                        <Input
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="border-zinc-300 text-primary"
                        />

                        <div className="space-x-2">
                            <Button 
                                type="submit"
                                className="text-white hover:text-primary-shade cursor-pointer"
                            >
                                Submit
                            </Button>

                            <Button 
                                onClick={() => setShowInputDescription(false)}
                                className="bg-secondary text-white hover:bg-secondary-shade cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div onClick={() => setShowInputDescription(true)} className="mb-6 hover:bg-zinc-100 rounded-lg cursor-pointer">
                        <p className="font-medium px-2">Description</p>
                        <p className="px-2">{description}</p>

                    </div>
                )}

                <div>
                    <div>
                        {items.map((item) => (
                            <Item 
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                isDone={item.is_done}
                                onUpdateItem={(id, newContent) => updateItem(id, newContent)}
                                onDelete={() => deleteItem(item.id)}
                                onToggle={() => toggleItem(item.id)}
                            />
                        ))}
                    </div>
                    <div className="mt-3">
                        {showAddItem ? (
                            <form 
                                className="space-y-2 mb-2"
                                onSubmit={(e) => {
                                    createItems(e);
                                    setShowAddItem(false)
                                }}
                            >
                                <Input
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="border-zinc-300"
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" className="text-white bg-primary hover:bg-primary-shade cursor-pointer">Submit</Button>
                                    <Button type="button" onClick={() => setShowAddItem(false)} className="bg-secondary cursor-pointer text-white hover:bg-secondary-shade">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <Button className="bg-primary text-white" onClick={() => setShowAddItem(true)}>
                                Add Item
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </DialogModal>
    );
};

export default Task;