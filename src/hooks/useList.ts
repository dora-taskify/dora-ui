import axiosInstance from "@/utils/axios";
import { useEffect, useState, useCallback } from "react";
import type { DropResult } from "@hello-pangea/dnd";

const useList = (id: number, prio?: string, sort?: string) => {
    const [lists, setLists] = useState<any[]>([])
    const [tasks, setTasks] = useState<Record<number, any[]>>({})
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const fetchList = useCallback(async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/board/${id}?t=${Date.now()}`)
            setLists(res.data.data.list)
        } catch (error) {
            console.error("Failed to fetch lists:", error);
        }
    }, [id])

    const fetchTasks = useCallback(async () => {
        if (lists.length === 0) return;
        const newTasks: Record<number, any[]> = {};
        await Promise.all(
            lists.map(async (list) => {
                try {
                    const res = await axiosInstance.get(`/api/v1/task/${id}/${list.id}?t=${Date.now()}`);
                    newTasks[list.id] = res.data.data;
                } catch (error) {
                    console.error(`Failed to fetch tasks for list ${list.id}:`, error);
                    newTasks[list.id] = [];
                }
            })
        );
        setTasks(newTasks);
    }, [id, lists]);

    const updateTasks = useCallback((listId: number, newTasks: any[]) => {
        setTasks(prev => ({ ...prev, [listId]: newTasks }));
    }, []);

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

        const sourceListId = Number(source.droppableId);
        const destListId = Number(destination.droppableId);
        const taskId = Number(draggableId);

        setTasks(prev => {
            const newTasks = { ...prev };
            const sourceTasks = [...(newTasks[sourceListId] || [])];
            const destTasks = [...(newTasks[destListId] || [])];

            const [movedTask] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, movedTask);

            newTasks[sourceListId] = sourceTasks;
            newTasks[destListId] = destTasks;

            return newTasks;
        });

        try {
            await axiosInstance.patch(
                `/api/v1/task/move/${id}/${source.droppableId}/${draggableId}`, {
                destinationListId: destListId,
                newPosition: destination.index + 1,
            });
            console.log("success");
            
        } catch (err) {
            console.error("Failed to update task position:", err);
            // Revert on failure
            setTasks(prev => {
                const newTasks = { ...prev };
                const sourceTasks = [...(newTasks[sourceListId] || [])];
                const destTasks = [...(newTasks[destListId] || [])];

                const [movedTask] = destTasks.splice(destination.index, 1);
                sourceTasks.splice(source.index, 0, movedTask);

                newTasks[sourceListId] = sourceTasks;
                newTasks[destListId] = destTasks;

                return newTasks;
            });
        }
    };

    const handleDelete = async (listId: number) => {
        await axiosInstance.delete(`/api/v1/list/${id}/${listId}`)
        await fetchList()

        try {
        } catch (error) {
            console.error("Failed to delete list:", error);
        }
    }

    useEffect(() => {
        fetchList()
    }, [fetchList])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks, refetchTrigger])

    return { lists, setLists, tasks, setTasks, name, setName, handleCreateList, description, setDescription, archieveList, updateList, fetchList, handleDragTask, handleDelete, refetchTrigger, setRefetchTrigger, updateTasks }
}

export default useList

