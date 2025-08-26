import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "@/pages/RegisterPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import { useEffect, useState } from "react"
import { isMobileDevice } from "@/utils/detectDevice"
import DashboardMobile from "@/pages/DashboardMobile"
import TaskPage from "@/pages/TaskPage"

const AppRoutes = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobileDevice())
    }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={isMobile ? <DashboardMobile/> : <DashboardPage/>} />
                <Route path="/board" element={isMobile ? <DashboardMobile/> : <TaskPage/>} />
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes