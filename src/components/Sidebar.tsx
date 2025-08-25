import { useState } from "react";
import { Menu, Home, CheckSquare, Calendar, Star } from "lucide-react";

type SidebarProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const Sidebar = ({open, setOpen}: SidebarProps) => {
    const [active, setActive] = useState("Home")

    const menus = [
        { id: "Dashboard", icon: <Home width={16} />, label: "Dashboard" },
        { id: "Tasks", icon: <CheckSquare width={16} />, label: "Tasks" },
        { id: "Today", icon: <Calendar width={16} />, label: "Today" },
        { id: "Important", icon: <Star width={16} />, label: "Important" },
    ];

    return (
        <div
        className={`fixed top-0 left-0 h-screen bg-stone-50 transition-all duration-300 flex flex-col
            ${open ? "w-70" : "w-16 bg-white"}`}
        >

            <div
                className={`px-3 py-3 flex items-center transition-all ${
                open ? "justify-between" : "justify-center"
                }`}
            >
                <div className="flex items-center gap-2">
                {open && (
                    <>
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-7 rounded-full object-cover"
                    />
                    <h2 className="font-medium">Fadli</h2>
                    </>
                )}
                </div>
                <Menu
                className="cursor-pointer hover:bg-stone-100 rounded"
                width={18}
                onClick={() => setOpen(!open)}
                />
            </div>

            <nav className="flex flex-col px-3">
                {menus.map((menu) => (
                    <button
                        key={menu.id}
                        onClick={() => setActive(menu.id)}
                        className={`cursor-pointer flex items-center w-full py-1 px-2 rounded transition-all
                        ${open ? "gap-3 justify-start" : "justify-center"}
                        ${
                            active === menu.id
                            ? "bg-purple-100 text-purple-600"
                            : "hover:bg-stone-200"
                        }`}
                    >
                        {menu.icon}
                        {open && <p className="text-sm">{menu.label}</p>}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
