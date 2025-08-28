import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import List from "@/components/myUi/List";
import useList from "@/hooks/useList";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TaskPage = () => {
    const { id } = useParams();
    console.log(id);
    const { lists, name, setName, handleCreateList, description, setDescription, archieveList, updateList } = useList(Number(id));
    const [open, setOpen] = useState(true);
    const [showInput, setShowInput] = useState(false);

    return (
        <div className="flex h-screen w-full bg-white text-start">
        <Sidebar open={open} setOpen={setOpen} />

            <div
                className={`flex-1 flex flex-col gap-4 pt-6 transition-all duration-300 overflow-y-auto ${
                open ? "pl-70" : "pl-20"
                }`}
            >
                <div className="flex gap-4 items-start overflow-x-auto flex-nowrap pb-4 h-full px-8">
                {lists.map((list) => ( !list.is_archieved &&
                    <div key={list.id} className="flex-shrink-0 w-64">
                        <List name={list.name} onEdit={(id, name, description) => updateList(id, name, description)} id={list.id} onArchive={(id) => archieveList(Number(id))}/>
                    </div>
                ))}

                {/* Add List */}
                <div className="w-64">
                    {showInput ? (
                        <form onSubmit={handleCreateList}>
                            <div className="bg-white rounded-xl border border-zinc-300 p-4 flex flex-col gap-2 mt-9 w-64">
                                <div className="flex flex-col gap-2">
                                    <Input
                                    placeholder="List Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                    <Textarea 
                                        placeholder="Description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="destructive"
                                    onClick={() => setShowInput(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-purple-400 hover:bg-purple-300"
                                >
                                    Create
                                </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
                    <Button
                        variant="outline"
                        className="w-full h-13 mt-9 rounded-lg w-64"
                        onClick={() => setShowInput(true)}
                    >
                        + Add List
                    </Button>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
