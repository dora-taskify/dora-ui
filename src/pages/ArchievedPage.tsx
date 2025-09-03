import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/myUi/Board";
import useCreateBoard from "@/hooks/useBoard";

const ArchievedPage = () => {
    const {boards, deleteBoard, archieveBoard } = useCreateBoard()
    const [open, setOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-white text-start px-8">
            <Sidebar open={open} setOpen={setOpen} />

            <div
                className={`flex-1 flex flex-col gap-4 pt-6 transition-all duration-300 
                ${open ? "pl-70" : "pl-20"}`}
            >

                <div className="grid grid-cols-3 gap-4">
                    {boards.map((board) => ( board.is_archieved && (
                            <Dashboard
                            key={board.id}
                            id={board.id}
                            title={board.name}
                            mode="archived"
                            onArchive={(id) => archieveBoard(Number(id))}
                            onDelete={(id) => deleteBoard(Number(id))}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArchievedPage;
