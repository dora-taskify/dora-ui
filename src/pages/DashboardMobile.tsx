import Dashboard from "@/components/myUi/Board";
import DialogModal from "@/components/myUi/DialogModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBoard from "@/hooks/useBoard";
import { DialogClose } from "@radix-ui/react-dialog";
import BottomMenu from "@/components/myUi/BottomMenu";

const DashboardMobile = () => {
    const { name, setName, handleSubmit, boards, archieveBoard, updateBoard } = useBoard();

    return (
        <div className="flex h-screen w-full bg-white text-start bg-app">
            <BottomMenu />

            <div className="flex-1 flex flex-col gap-4 pt-6 mt-10 transition-all duration-300 px-4 overflow-auto">
                <div className="flex gap-2 items-center justify-between min-w-[280px]">
                <p className="text-2xl font-medium">Dashboard</p>

                <DialogModal
                    trigger={
                    <Button className="cursor-pointer bg-primary hover:bg-primary-shade text-white hover:text-black">
                        Create
                    </Button>
                    }
                    title="Add new board"
                >
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Board Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                        <Button className="cursor-pointer bg-secondary hover:bg-secondary-shade text-white">
                            Cancel
                        </Button>
                        </DialogClose>
                        <Button
                        type="submit"
                        className="cursor-pointer bg-primary hover:bg-primary-shade text-white"
                        >
                        Create
                        </Button>
                    </div>
                    </form>
                </DialogModal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {boards.map(
                    (board) =>
                    !board.is_archieved && (
                        <Dashboard
                        key={board.id}
                        id={board.id}
                        title={board.name}
                        mode="dashboard"
                        onEdit={(id, name) => updateBoard(id, name)}
                        onArchive={(id) => archieveBoard(Number(id))}
                        />
                    )
                )}
                </div>
            </div>
        </div>
    );
};

export default DashboardMobile;