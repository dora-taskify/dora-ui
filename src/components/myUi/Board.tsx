import React, { useState } from "react";
import { Archive, Pencil, Trash, Undo } from "lucide-react";
import DialogModal from "@/components/myUi/DialogModal";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type BoardProps = {
    id: string
    title: string
    mode?: "dashboard" | "archived";
    onEdit?: (id: number, name: string) => void;
    onArchive?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ 
    id, 
    title,
    mode = "dashboard",
    onEdit,
    onArchive,
    onDelete, 
}) => {
    const [name, setName] = useState("");
    const navigate = useNavigate()

    const goToDetail = () => {
        navigate(`/board/${id}`)
    }
    
    return (
        <div
            key={id}
            onClick={mode === "dashboard" ? goToDetail : undefined}
            className="cursor-pointer bg-white rounded-xl border border-zinc-300 overflow-hidden mb-10 hover:shadow-sm"
        >
            <div className="h-22 w-full overflow-hidden bg-zinc-200">
                <img src="/wallpaper.jpg" alt="header" />
            </div>

            <div className="p-4 flex justify-between">
                <h2>{title}</h2>
                    <div className="flex gap-2">
                        {mode === "dashboard" && (
                            <>
                                <DialogModal
                                    trigger={<Pencil width={20} className="hover:text-blue-400 cursor-pointer" onClick={(e) => e.stopPropagation()}/>}
                                    title="Update Board"
                                >
                                    <form className="flex flex-col gap-3" onSubmit={(e) => {
                                        e.preventDefault()
                                        onEdit?.(Number(id), name)
                                    }}>
                                        <Input placeholder="Board Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <DialogClose asChild>
                                                <Button className="text-white cursor-pointer bg-secondary hover:bg-secondary-shade">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" className="text-white cursor-pointer bg-primary hover:bg-primary-shade">
                                                Update
                                            </Button>
                                        </div>
                                    </form>
                                </DialogModal>
                                <Archive 
                                    onClick={(e) => {e.stopPropagation(); onArchive?.(Number(id));}}
                                    width={20} className="hover:text-gray-500 cursor-pointer"
                                />
                            </>
                        )}

                        {mode === "archived" && (
                            <>
                            <Undo
                                onClick={(e) => {e.stopPropagation(); onArchive?.(Number(id));}}
                                width={20}
                                className="hover:text-green-500 cursor-pointer"
                            />
                            {/* Delete */}
                                <DialogModal
                                    trigger={<Trash width={20} className="hover:text-blue-400 cursor-pointer" onClick={(e) => e.stopPropagation()}/>}
                                    title="Are you sure want to delete this board?"
                                >
                                    <div className="flex justify-end gap-2 mt-4">
                                        <DialogClose asChild>
                                            <Button className="cursor-pointer text-white bg-primary hover:bg-primary-shade">Nope</Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={() => {onDelete?.(Number(id))}} className="cursor-pointer bg-secondary text-white hover:bg-secondary-shade">
                                            Sure
                                        </Button>
                                    </div>
                                </DialogModal>
                            </>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default Board;
