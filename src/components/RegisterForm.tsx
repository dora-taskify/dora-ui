import InputField from "@/components/myUi/InputField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/utils/axios";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");

    const isFormValid =
        username && email && password && password.length >= 6 && username.length >= 6;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccess("");

        try {
            await axiosInstance.post("/api/v1/register", {
                username,
                email,
                password,
            });

            setSuccess("Registrasi berhasil! Silakan cek Gmail Anda untuk konfirmasi.");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Terjadi Kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/30 via-white to-secondary/20 relative overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

            <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/80 shadow-2xl border border-white/50 rounded-3xl p-6 animate-fadeIn z-10">
                <h1 className="font-bold text-3xl text-center mb-4 text-zinc-800">
                    Create an account
                </h1>

                {success && (
                    <p className="mb-3 text-center text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-200">
                        {success}{" "}
                        <a
                            href="https://mail.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 ml-2 text-sm underline"
                        >
                            Buka Gmail
                        </a>
                    </p>
                )}

                {errorMessage && (
                    <p className="mb-3 text-center text-red-500 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                        {errorMessage}
                    </p>
                )}

                <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
                    <div>
                        <InputField
                            label="Username"
                            value={username}
                            onChange={setUsername}
                            placeholder="Enter your username..."
                            type="text"
                        />
                        {username && username.length < 6 && (
                            <p className="text-red-500 text-sm mt-1">
                                Username must 6 or more alphabet
                            </p>
                        )}
                    </div>
                    <InputField
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email..."
                        type="email"
                    />
                    <div>
                        <InputField
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            placeholder="Enter your password..."
                            type="password"
                        />
                        {password && password.length < 6 && (
                            <p className="text-red-500 text-sm mt-1">
                                Password must 6 or more characters
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`flex justify-center items-center font-semibold py-3 px-4 rounded-xl transition-all duration-200 tracking-wide shadow-md
                            ${
                                isFormValid
                                    ? "bg-primary text-white hover:bg-primary-shade active:scale-95"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-500">
                    Already signed up?{" "}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                        Go to login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;