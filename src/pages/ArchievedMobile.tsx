import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/myUi/Board";
import useBoard from "@/hooks/useBoard";

const ArchievedMobile = () => {
    const { boards, archieveBoard, deleteBoard } = useBoard();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-white text-start">
            <Sidebar open={open} setOpen={setOpen} />

            <div
                className="flex-1 flex flex-col gap-4 pt-6 transition-all duration-300 px-4 ml-15 overflow-auto"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {boards.map(
                    (board) =>
                        board.is_archieved && (
                        <Dashboard
                            key={board.id}
                            id={board.id}
                            title={board.name}
                            mode="archived"
                            onArchive={(id) => archieveBoard(Number(id))}
                            onDelete={(id) => deleteBoard(Number(id))}
                        />
                    )
                )}
                </div>
            </div>
        </div>
    );
};

export default ArchievedMobile