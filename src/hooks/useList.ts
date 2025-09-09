import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";

const useList = (id: number) => {
    const [lists, setLists] = useState<any[]>([])
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const fetchList = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/board/${id}?t=${Date.now()}`)
            setLists(res.data.data.list)
        } catch (error) {
            console.error("Failed to fetch boards:", error);
        }
    }

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault()
        setName("")
        setDescription("")
        try {
            await axiosInstance.post(`/api/v1/list/${id}`, {
                name,
                description
            })
            await fetchList()
        } catch (error) {
            console.log("reject");
        }
    }

    const updateList = async (listId: number, name: string, description: string) => {
        try {
            await axiosInstance.put(`/api/v1/list/${id}/${listId}/`, {
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
            await axiosInstance.patch(`/api/v1/list/${id}/${listId}`)
            await fetchList()

        } catch (error) {
            console.error("Failed to archieve", error);
        }
    }

    const handleDragTask = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        try {
            await axiosInstance.patch(
                `/api/v1/task/move/${id}/${source.droppableId}/${draggableId}`, {
                destinationListId: Number(destination.droppableId),
                newPosition: destination.index + 1,
            });
            setRefetchTrigger(prev => prev + 1);
        } catch (err) {
            console.error("Gagal update posisi task:", err);
        }
    };

    const handleDelete = async (listId: number) => {
        await axiosInstance.delete(`/api/v1/list/${id}/${listId}`)
        fetchList()

        try {
        } catch (error) {
            console.error("Gagal delete list:", error);
        }
    }

    useEffect(() => {
        fetchList()
    },[])

    return { lists, setLists, name, setName, handleCreateList, description, setDescription, archieveList, updateList, fetchList, handleDragTask, handleDelete, refetchTrigger }
}

export default useList