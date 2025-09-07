import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "@/pages/RegisterPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import { useEffect, useState } from "react"
import { isMobileDevice } from "@/utils/detectDevice"
import DashboardMobile from "@/pages/DashboardMobile"
import ArchievedMobile from "@/pages/ArchievedMobile"
import TaskPage from "@/pages/TaskPage"
import TaskMobile from "@/pages/TaskPageMobile"
import ArchievedPage from "@/pages/ArchievedPage"
import HomePage from "@/pages/HomePage"

const AppRoutes = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobileDevice())
    }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={isMobile ? <DashboardMobile/> : <DashboardPage/>} />
                <Route path="/archieved-board" element={isMobile ? <ArchievedMobile/> : <ArchievedPage/>} />
                <Route path="/board/:id" element={isMobile ? <TaskMobile/> : <TaskPage/>} />
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes