import Sidebar from "@/components/Sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import List from "@/components/myUi/List";
import useList from "@/hooks/useList";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const TaskPage = () => {
    const { id } = useParams();
    const { lists, name, setName, handleCreateList, description, setDescription, archieveList, updateList, handleDragTask, handleDelete } = useList(Number(id));
    const [open, setOpen] = useState(true);
    const [showInput, setShowInput] = useState(false);

    const [prio, setPrio] = useState<string | undefined>();
    const [sort, setSort] = useState<"asc" | "desc" | undefined>();

  return (
    <div className="flex h-screen w-full bg-white text-start">
      <Sidebar open={open} setOpen={setOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          open ? "pl-70" : "pl-20"
        }`}
      >
        <div 
            className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-stone-50 px-7 py-2 shadow-sm ml-[70px] transition-all duration-300"
            style={{ marginLeft: open ? "280px" : "69px" }}>
          <h1 className="text-xl font-bold">Tasks</h1>

          <div className="flex gap-6 items-center">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center rounded hover:bg-zinc-100">
                    <ListFilter size={20}/>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={prio === "LOW"}
                    onCheckedChange={() => setPrio(prio === "LOW" ? undefined : "LOW")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={prio === "MEDIUM"}
                    onCheckedChange={() =>
                      setPrio(prio === "MEDIUM" ? undefined : "MEDIUM")
                    }
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={prio === "HIGH"}
                    onCheckedChange={() => setPrio(prio === "HIGH" ? undefined : "HIGH")}
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={prio === "CRITICAL"}
                    onCheckedChange={() =>
                      setPrio(prio === "CRITICAL" ? undefined : "CRITICAL")
                    }
                  >
                    Critical
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Sort by Deadline</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={sort === "asc"}
                    onCheckedChange={() => setSort(sort === "asc" ? undefined : "asc")}
                  >
                    Ascending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sort === "desc"}
                    onCheckedChange={() => setSort(sort === "desc" ? undefined : "desc")}
                  >
                    Descending
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center rounded hover:bg-zinc-100">
                    <Ellipsis size={20}/>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 max-h-96 overflow-y-auto p-2">
                <DropdownMenuLabel>Archieved List</DropdownMenuLabel>
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

        </div>

        <div className="flex-1 overflow-y-auto pt-[64px]">
          <div className="flex items-start flex-nowrap pb-4 h-full">
            <DragDropContext onDragEnd={handleDragTask}>
              <div className="flex gap-4 items-start flex-nowrap pb-4 h-full px-6">
                {lists.map(
                  (list) =>
                    !list.is_archieved && (
                      <div key={list.id} className="flex-shrink-0 w-64">
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
              </div>
            </DragDropContext>

            {/* Add List */}
            <div>
              {showInput ? (
                <form
                  onSubmit={(e) => {
                    handleCreateList(e);
                    setShowInput(false);
                  }}
                >
                  <div className="bg-white rounded-xl flex flex-col gap-2 mt-16 w-65">
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
                  className="cursor-pointer hover:bg-secondary-shade w-full h-14 mt-16 rounded-lg w-64 bg-white border border-zinc-300"
                  onClick={() => setShowInput(true)}
                >
                  + Add List
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;