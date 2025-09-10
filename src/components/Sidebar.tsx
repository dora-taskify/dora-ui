import axiosInstance from "@/utils/axios";
import { isMobileDevice } from "@/utils/detectDevice";
import { Menu, Home, ArchiveRestore, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

type SidebarProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({open, setOpen}: SidebarProps) => {
    const menus = [
        { id: "Dashboard", icon: <Home width={20} />, label: "Dashboard" },
        { id: "archieved-board", icon: <ArchiveRestore width={20} />, label: "Archieved" },
    ];
    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(false)

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/api/v1/logout")
            localStorage.removeItem("email")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setIsMobile(isMobileDevice())
    }, []);

    return (
        <>
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
                        
                    </div>
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
                    <div className="flex mt-92 p-2 gap-2 font-bold text-sm hover:bg-zinc-200 rounded-sm items-center" onClick={handleLogout}>
                        <LogOut width={18}/>
                        <p>Logout</p>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
