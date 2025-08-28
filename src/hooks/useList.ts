import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";

const useList = (id: number) => {
    const [lists, setLists] = useState<any[]>([])
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")

    const fetchList = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/list/?board_id=${id}`)
            
            setLists(res.data.data)
        } catch (error) {
            console.error("Failed to fetch boards:", error);
        }
    }

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault()
        setName("")
        setDescription("")
        try {
            await axiosInstance.post(`/api/v1/list?board_id=${id}`, {
                name,
                description
            })
            console.log("success");
            await fetchList()
        } catch (error) {
            console.log("reject");
        }
    }

    const updateList = async (listId: number, name: string, description: string) => {
        try {
            await axiosInstance.put(`/api/v1/list?board_id=${id}&list_id=${listId}`, {
                name,
                description
            })
            await fetchList()
        } catch (error) {
            console.error("Failed to update", error);
        }
    }

    const archieveList = async (listId: number) => {
        try {
            await axiosInstance.patch(`/api/v1/list?board_id=${id}&list_id=${listId}`)
            await fetchList()
        } catch (error) {
            console.error("Failed to delete", error);
        }
    }

    useEffect(() => {
        fetchList()
    },[])

    return { lists, setLists, name, setName, handleCreateList, description, setDescription, archieveList, updateList }
}

export default useList