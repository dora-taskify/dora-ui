import axiosInstance from "@/utils/axios"
import React, { useEffect, useState } from "react"

const useBoard = () => {
    const [boards, setBoards] = useState<any[]>([])
    const [name, setName] = useState("")

    const fetchBoards = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/board")
            
            setBoards(res.data.data)
        } catch (error) {
            console.error("Failed to fetch boards:", error);
        }
    }

    const deleteBoard = async (id:number) => {
        try {
            await axiosInstance.delete(`/api/v1/delete/${id}`)
            await fetchBoards()
        } catch (error) {
            console.error("Failed to delete", error);
        }
    }

    const archieveBoard = async (id: number) => {
        try {
            await axiosInstance.patch(`/api/v1/archieve-board/${id}`)
            await fetchBoards()
        } catch (error) {
            console.error("Failed to delete", error);
        }
    }

    const updateBoard = async (id: number, name: string) => {
        try {
            await axiosInstance.patch(`/api/v1/board/${id}`, {
                name
            })
            await fetchBoards()
        } catch (error) {
            console.error("Failed to update", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setName("")

        try {
            await axiosInstance.post("/api/v1/board", {
                name
            })
            console.log("success");
            await fetchBoards()
        } catch (error) {
            console.log("reject");
        }
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    return { name, setName, handleSubmit, boards, archieveBoard, updateBoard, deleteBoard }
}

export default useBoard