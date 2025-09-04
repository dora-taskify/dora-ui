import Sidebar from "@/components/Sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import List from "@/components/myUi/List";
import useList from "@/hooks/useList";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TaskPage = () => {
  const { id } = useParams();
  const { lists, name, setName, handleCreateList, description, setDescription, archieveList, updateList, handleDragTask } = useList(Number(id));
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
          <div className="flex items-start flex-nowrap pb-4 h-full">
            <DragDropContext onDragEnd={handleDragTask}>
                <div className="flex gap-4 items-start flex-nowrap pb-4 h-full px-6">
                  {lists.map((list) => (
                    !list.is_archieved && (
                      <div key={list.id} className="flex-shrink-0 w-64">
                        <List
                          name={list.name}
                          description={list.description}
                          onEdit={(id, name, description) => updateList(id, name, description)}
                          id={list.id}
                          onArchive={(id) => archieveList(Number(id))}
                        />
                      </div>
                    )
                  ))}
                </div>
            </DragDropContext>

            {/* Add List */}
            <div>
              {showInput ? (
                <form onSubmit={(e) => {
                  handleCreateList(e);
                  setShowInput(false)
                }
                  }>
                  <div className="bg-white rounded-xl flex flex-col gap-2 mt-12 w-65">
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
  );
};

export default TaskPage;
