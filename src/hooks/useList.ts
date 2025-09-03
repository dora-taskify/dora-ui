import axiosInstance from "@/utils/axios";
import { useEffect, useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";

const useList = (id: number) => {
    const [lists, setLists] = useState<any[]>([])
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")

    const fetchList = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/board/${id}`)
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
            console.log("success");
            await fetchList()
        } catch (error) {
            console.log("reject");
        }
    }

    const updateList = async (listId: number, name: string, description: string) => {
        try {
            await axiosInstance.put(`/task/${id}/${listId}/${id}`, {
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
            console.log("sukses isi dua");
            
        } catch (error) {
            console.error("Failed to archieve", error);
        }
    }

    const handleDragTask = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        console.log(`ini source: ${source.droppableId}`);
        console.log(`ini destination ${destination?.droppableId}`);
        console.log(`ini draggabale id ${draggableId}`);

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        try {
            await axiosInstance.patch(
                `/api/v1/task/move/${id}/${source.droppableId}/${draggableId}`, {
                destinationListId: Number(destination.droppableId),
                newPosition: destination.index,
            });
             
        
            console.log("Sukses");
            window.location.reload();
        } catch (err) {
            console.error("Gagal update posisi task:", err);
        }
    };

    useEffect(() => {
        fetchList()
    },[])

    return { lists, setLists, name, setName, handleCreateList, description, setDescription, archieveList, updateList, fetchList, handleDragTask }
}

export default useList