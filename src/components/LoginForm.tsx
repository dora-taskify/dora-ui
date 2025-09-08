import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/myUi/InputField";
import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import SplashScreen from "@/components/SplashScreen";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [showSplash, setShowSplash] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const isFormValid = email && password

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowSplash(true);
        setErrorMessage("")
        try {
            const res = await axiosInstance.post("/api/v1/login", {
                email,
                password
            })

            localStorage.setItem("email", res.data.data.email);

            navigate("/dashboard");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Terjadi kesalahan!");
        } finally {
            setShowSplash(false);
            setLoading(false)
        }
    }

    if (showSplash) {
        return <SplashScreen />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1 className="font-bold text-start text-3xl mb-4 text-primary">Log In</h1>
                {errorMessage && (
                    <p className="mb-2 text-start text-red-500">{errorMessage}</p>
                )}
                <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto mb-6">
                    <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter your email..." type="email"/>
                    <InputField label="Password" value={password} onChange={setPassword} placeholder="Enter your password..." type="password"/>

                    <button 
                        type="submit" 
                        disabled={!isFormValid}
                        className={`flex justify-center text-white font-bold py-2 px-4 rounded-md transition-colors tracking-wide
                        ${isFormValid ? "cursor-pointer bg-primary hover:bg-primary-shade transition" : "bg-gray-300 cursor-not-allowed"}`}
                    >
                    {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>
                <p className="border-t pt-4">Dont have an account? <Link to="/register" className="text-blue-400 underline">Register here</Link></p>
            </div>
        </div>
    )
}

export default LoginForm