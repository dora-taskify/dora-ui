import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import List from "@/components/myUi/List";
import useList from "@/hooks/useList";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomMenu from "@/components/myUi/BottomMenu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ArchivedList from "@/components/myUi/ArchievedList";
import { ListFilter, Ellipsis } from "lucide-react";

const TaskMobile = () => {
    const { id } = useParams();
    const {
        lists,
        name,
        setName,
        handleCreateList,
        description,
        setDescription,
        archieveList,
        updateList,
        handleDragTask,
        handleDelete,
    } = useList(Number(id));

    const [showInput, setShowInput] = useState(false);
    const [prio, setPrio] = useState<string | undefined>();
    const [sort, setSort] = useState<"asc" | "desc" | undefined>();

    return (
        <div className="h-screen w-full bg-white flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-stone-50 px-4 h-14 shadow-sm">
                <h1 className="text-lg font-bold">Tasks</h1>

                <div className="flex gap-4 items-center">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button className="flex items-center rounded hover:bg-zinc-100 p-1">
                        <ListFilter size={20} />
                    </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>Priority</DropdownMenuLabel>
                    {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((level) => (
                        <DropdownMenuCheckboxItem
                        key={level}
                        checked={prio === level}
                        onCheckedChange={() =>
                            setPrio(prio === level ? undefined : level)
                        }
                        >
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                        </DropdownMenuCheckboxItem>
                    ))}

                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Sort by Deadline</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                        checked={sort === "asc"}
                        onCheckedChange={() =>
                        setSort(sort === "asc" ? undefined : "asc")
                        }
                    >
                        Ascending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={sort === "desc"}
                        onCheckedChange={() =>
                        setSort(sort === "desc" ? undefined : "desc")
                        }
                    >
                        Descending
                    </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button className="flex items-center rounded hover:bg-zinc-100 p-1">
                        <Ellipsis size={20} />
                    </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 max-h-96 overflow-y-auto p-2">
                    <DropdownMenuLabel>Archived List</DropdownMenuLabel>
                    {lists.map(
                        (list) =>
                        list.is_archieved && (
                            <div key={list.id} className="mb-2">
                            <ArchivedList
                                id={list.id}
                                name={list.name}
                                description={list.description}
                                onRestore={(id) => archieveList(Number(id))}
                                onDelete={(id) => handleDelete(Number(id))}
                            />
                            </div>
                        )
                    )}
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden pt-16 pb-20">
                <DragDropContext onDragEnd={handleDragTask}>
                <div className="flex gap-4 px-2 pb-4 flex-nowrap">
                    {lists.map(
                    (list) =>
                        !list.is_archieved && (
                        <div key={list.id} className="flex-shrink-0 w-72">
                            <List
                            name={list.name}
                            description={list.description}
                            onEdit={(id, name, description) =>
                                updateList(id, name, description)
                            }
                            id={list.id}
                            onArchive={(id) => archieveList(Number(id))}
                            prio={prio}
                            sort={sort}
                            />
                        </div>
                        )
                    )}

                    {/* Create New List */}
                    <div className="flex-shrink-0 w-72">
                    {showInput ? (
                        <form
                        onSubmit={(e) => {
                            handleCreateList(e);
                            setShowInput(false);
                        }}
                        >
                        <div className="bg-white rounded-xl flex flex-col gap-2 p-3 shadow">
                            <Input
                            placeholder="List Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                            <Textarea
                            placeholder="Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="flex gap-2 justify-end">
                            <Button
                                type="button"
                                className="bg-secondary hover:bg-secondary-shade text-white"
                                onClick={() => setShowInput(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary hover:bg-primary-shade text-white"
                            >
                                Create
                            </Button>
                            </div>
                        </div>
                        </form>
                    ) : (
                        <Button
                        className="cursor-pointer border-2 border-dashed border-zinc-300 hover:border-zinc-400 w-full h-12 rounded-lg bg-white"
                        onClick={() => setShowInput(true)}
                        >
                        + Add List
                        </Button>
                    )}
                    </div>
                </div>
                </DragDropContext>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-30">
                <BottomMenu />
            </div>
        </div>
    );
};

export default TaskMobile;