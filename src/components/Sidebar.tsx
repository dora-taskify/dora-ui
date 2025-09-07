import { isMobileDevice } from "@/utils/detectDevice";
import { Menu, Home, ArchiveRestore, Calendar, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

type SidebarProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({open, setOpen}: SidebarProps) => {
    const menus = [
        { id: "Dashboard", icon: <Home width={20} />, label: "Dashboard" },
        { id: "archieved-board", icon: <ArchiveRestore width={20} />, label: "Archieved" },
        { id: "Today", icon: <Calendar width={20} />, label: "Today" },
        { id: "Important", icon: <Star width={20} />, label: "Important" },
    ];

    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        setIsMobile(isMobileDevice())
    }, []);

    return (
        <div
        className={`fixed top-0 left-0 h-screen bg-zinc-50 transition-all duration-300 flex flex-col py-5
            ${open ? "w-70" : "w-17 bg-white"}`}
        >

            <div
                className={`px-3 py-3 flex items-center transition-all ${
                open ? "justify-between" : "justify-center"
                }`}
            >
                <div>
                {open && (
                    <div className="flex items-center gap-3 px-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-6 rounded-full object-cover"
                        />
                        <h2 className="font-medium text-sm truncate">{localStorage.getItem("email")}</h2>
                    </div>
                )}
                </div>
                {!isMobile && (
                    <Menu
                        className="cursor-pointer hover:bg-stone-100 rounded"
                        width={20}
                        onClick={() => setOpen(!open)}
                    />
                )}
            </div>

            <nav className="flex flex-col px-4">
                {menus.map((menu) => (
                    <Link
                        to={`/${menu.id.toLowerCase()}`}
                        key={menu.id}
                        className={`cursor-pointer flex hover:bg-zinc-200 items-center w-full py-2 px-2 rounded transition-all
                        ${open ? "gap-3 justify-start" : "justify-center"}`}
                    >
                        {menu.icon}
                        {open && <span className="text-sm">{menu.label}</span>}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
