import { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex">
            <Sidebar open={open} setOpen={setOpen} />
        </div>
    );
};

export default DashboardPage;
