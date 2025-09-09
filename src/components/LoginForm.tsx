import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/myUi/InputField";
import React, { useState } from "react";
import axiosInstance from "@/utils/axios";
import SplashScreen from "@/components/SplashScreen";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const isFormValid = email && password;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowSplash(true);
        setErrorMessage("");
        setLoading(true);
        try {
            const res = await axiosInstance.post("/api/v1/login", { email, password });
            localStorage.setItem("email", res.data.data.email);
            navigate("/dashboard");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Terjadi kesalahan!");
        } finally {
            setShowSplash(false);
            setLoading(false);
        }
    };

    if (showSplash) {
        return <SplashScreen />;
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/30 via-white to-secondary/20 relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

            <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/80 shadow-2xl border border-white/50 rounded-3xl p-6 animate-fadeIn z-10">
                <div className="flex justify-center mb-6">
                    <div className="text-white p-4 rounded-2xl shadow-lg">
                        <img src="Dora.png" alt="Dora" width={50}/>
                    </div>
                </div>

                <h1 className="font-bold text-3xl text-center mb-2 text-zinc-800">
                    Welcome back
                </h1>
                <p className="text-center text-zinc-500 mb-6">
                    Log in to stay on top of your tasks
                </p>

                {errorMessage && (
                    <p className="mb-4 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md border border-red-200 text-center">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
                    <InputField
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email..."
                        type="email"
                    />
                    <InputField
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Enter your password..."
                        type="password"
                    />

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`flex justify-center items-center font-semibold py-3 px-4 rounded-xl transition-all duration-200 tracking-wide shadow-md
                            ${isFormValid
                                ? "bg-primary text-white hover:bg-primary-shade active:scale-95"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-500">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-primary font-medium hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;