import InputField from "@/components/ui/InputField"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/utils/axios";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState("")
    
    const isFormValid = username && email && password && password.length >= 6 && username.length >= 6;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage("")
        setSuccess("")

        try {
            await axiosInstance.post("/api/v1/register", {
                username,
                email,
                password
            })

            setSuccess("Registrasi berhasil! Silakan cek Gmail Anda untuk konfirmasi.");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Terjadi Kesalahan");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="font-bold text-start mb-4 text-pink-900">Sign Up</h1>
            {success && (

                <p className="mb-3 text-start text-green-600">
                    Registrasi berhasil!
                    <a 
                        href="https://mail.google.com/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 ml-2 text-sm"
                    >
                        Buka Gmail
                    </a>
                </p>
            )}

            {errorMessage && (
                <p className="mb-2 text-start text-red-500">{errorMessage}</p>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto mb-6">
                <div>
                    <InputField label="Username" value={username} onChange={setUsername} placeholder="Enter your username..." type="text"/>
                    {username && username.length < 6 && (
                        <p className="text-red-500 text-sm font-medium text-start   ">
                            Username harus lebih dari 6 huruf
                        </p>
                    )}
                </div>
                <InputField label="Email" value={email} onChange={setEmail} placeholder="Enter your email..." type="email"/>
                <div className="flex flex-col gap-1">
                    <InputField label="Password" value={password} onChange={setPassword} placeholder="Enter your password..." type="password"/>
                    {password && password.length < 6 && (
                        <p className="text-red-500 text-sm font-medium text-start   ">
                            Password harus lebih dari 6 huruf
                        </p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={!isFormValid}
                    className={`flex justify-center text-white font-bold py-2 px-4 rounded-md transition-colors tracking-wide
                    ${isFormValid ? "cursor-pointer bg-pink-400 hover:bg-pink-600 transition" : "bg-gray-300 cursor-not-allowed"}`}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>
            <p className="border-t pt-4">Already signed up? <Link to="/login" className="text-blue-400 underline">Go to login</Link></p>
        </>
    )
}

export default RegisterForm