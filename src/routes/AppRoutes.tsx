import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/Dashboard"

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes