import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isMobileDevice } from "@/utils/detectDevice";
import { Menu, X, Home, ArchiveRestore, Calendar, Star } from "lucide-react";

const HamburgerMenu = () => {
    const menus = [
        { id: "Dashboard", icon: <Home width={20} />, label: "Dashboard" },
        { id: "archieved-board", icon: <ArchiveRestore width={20} />, label: "Archieved" },
        { id: "Today", icon: <Calendar width={20} />, label: "Today" },
        { id: "Important", icon: <Star width={20} />, label: "Important" },
    ];

    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);

    return (
        <div>
        {/* Tombol Hamburger */}
        {isMobile && (
            <button
            onClick={() => setOpen(!open)}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow hover:bg-zinc-100"
            >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        )}

        {/* Drawer */}
        <div
            className={`fixed top-0 left-0 h-full bg-zinc-50 transition-transform duration-300 flex flex-col py-5 z-40
            ${open ? "translate-x-0 w-64" : "-translate-x-full w-64"}
            `}
        >
            {/* Header */}
            <div className="px-3 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 px-3">
                <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-6 rounded-full object-cover"
                />
                <h2 className="font-medium truncate">{localStorage.getItem("email")}</h2>
            </div>
            <X
                className="cursor-pointer hover:bg-stone-100 rounded w-6 h-6"
                onClick={() => setOpen(false)}
            />
            </div>

            {/* Menu */}
            <nav className="flex flex-col px-4 mt-4">
            {menus.map((menu) => (
                <Link
                to={`/${menu.id.toLowerCase()}`}
                key={menu.id}
                className="cursor-pointer flex items-center gap-3 hover:bg-zinc-200 w-full py-2 px-2 rounded transition-all"
                onClick={() => setOpen(false)} // auto close saat klik menu
                >
                {menu.icon}
                <span className="text-sm">{menu.label}</span>
                </Link>
            ))}
            </nav>
        </div>

        {/* Overlay */}
        {open && (
            <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setOpen(false)}
            />
        )}
        </div>
    );
};

export default HamburgerMenu;