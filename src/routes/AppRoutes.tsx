import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "@/pages/RegisterPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes