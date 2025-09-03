import type React from "react";
import DialogModal from "@/components/myUi/DialogModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type TaskProps = {
    id: number;
    name: string;
    description: string;
    onUpdate?: (task: {id: number, name: string, description: string}) => void;
    onDelete?: (id: number) => void;
};

const Task: React.FC<TaskProps> = ({ id, name, description, onUpdate, onDelete }) => {
    const [showInputDescription, setShowInputDescription] = useState(false)
    const [showInputTitle, setShowInputTitle] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newDescription, setNewDescription] = useState(description)

    return (
        <DialogModal
            trigger={
            <div
                key={id}
                className="bg-white rounded-xl border border-zinc-300 p-4 cursor-grab hover:shadow-sm"
            >
                <div className="mb-2">
                    <span className="p-2 font-medium text-primary">{name}</span>
                </div>
                <div>
                    <p className="p-2 text-sm text-primary-shade truncate">{description}</p>
                </div>
            </div>}
        >
            <div>
                {showInputTitle ? (
                    <form 
                        className="space-y-2 mb-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            onUpdate?.({ id, name: newName, description: newDescription })
                            setShowInputTitle(false)
                        }}
                    >
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border-zinc-300"
                        />
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
                            <p className="font-medium">{name}</p>
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
                            onUpdate?.({ id, name: newName, description: newDescription })
                            setShowInputTitle(false)
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
                        <p className="font-medium">Description</p>
                        <p>{description}</p>
                    </div>
                )}

                <div>
                    <p className="font-medium">Item</p>
                </div>
            </div>
        </DialogModal>
    );
};

export default Task;