import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/ui/Board";
import { Plus } from "lucide-react";

const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-white text-start">
        <Sidebar open={open} setOpen={setOpen} />

        <div
            className={`flex-1 flex flex-col gap-4 pt-6 transition-all duration-300 overflow-y-auto 
            ${open ? "pl-70" : "pl-20"}`}
        >
            <div className="flex justify-between">
                <p className="text-2xl font-medium">Dashboard</p>
                <button
                    className="cursor-pointer bg-purple-200 hover:bg-purple-300 px-4 rounded"
                >
                    <Plus width={16}/>
                </button>
            </div>
            <div>
                <Dashboard/>
            </div>
        </div>
    </div>
  );
};

export default DashboardPage;
