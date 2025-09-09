import { Link, useLocation } from "react-router-dom";
import { Home, ArchiveRestore, Calendar, Star } from "lucide-react";

const BottomMenu = () => {
    const menus = [
        { id: "dashboard", icon: <Home size={20} />, label: "Dashboard" },
        { id: "archieved-board", icon: <ArchiveRestore size={20} />, label: "Archieved" },
        { id: "today", icon: <Calendar size={20} />, label: "Today" },
        { id: "important", icon: <Star size={20} />, label: "Important" },
    ];

  const location = useLocation();

  return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
            <nav className="flex justify-around items-center py-2">
                {menus.map((menu) => {
                const isActive = location.pathname === `/${menu.id.toLowerCase()}`;
                return (
                    <Link
                    to={`/${menu.id.toLowerCase()}`}
                    key={menu.id}
                    className={`flex flex-col items-center justify-center gap-1 text-xs transition-colors
                        ${isActive ? "text-primary font-semibold" : "text-zinc-500 hover:text-zinc-800"}
                    `}
                    >
                    {menu.icon}
                    <span>{menu.label}</span>
                    </Link>
                );
                })}
            </nav>
        </div>
    );
};

export default BottomMenu;