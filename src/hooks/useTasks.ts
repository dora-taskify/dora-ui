import axiosInstance from "@/utils/axios"
import { useState } from "react"

const useTask = (board_id: number, list_id: number, tasks: any[], updateTasks: (listId: number, newTasks: any[]) => void) => {
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [priority, setPriority] = useState("LOW");
    const [deadline, setDeadline] = useState<Date | null>(null)

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault()
        const newTask = {
            id: Date.now(), // Temporary ID
            name: taskName,
            description: taskDescription,
            priority,
            deadline,
            // Add other fields as needed
        };

        // Optimistic update
        updateTasks(list_id, [...tasks, newTask]);
        setTaskName("")
        setTaskDescription("")
        setPriority("LOW")
        setDeadline(null)

        try {
            const res = await axiosInstance.post(`/api/v1/task/${board_id}/${list_id}`, {
                name: taskName,
                description: taskDescription,
                deadline,
                priority
            })
            // Update with real ID
            updateTasks(list_id, tasks.map(t => t.id === newTask.id ? { ...t, id: res.data.id } : t));
        } catch (error) {
            console.log("Failed to create task:", error);
            // Revert
            updateTasks(list_id, tasks.filter(t => t.id !== newTask.id));
        }
    }

    const handleDeleteTask = async (taskId: number) => {
        // Optimistic update
        const originalTasks = [...tasks];
        updateTasks(list_id, tasks.filter((task) => task.id !== taskId));

        try {
            await axiosInstance.delete(
                `/api/v1/task/${board_id}/${list_id}/${taskId}`
            )
            console.log("Task deleted successfully")
        } catch (error) {
            console.error("Failed to delete task:", error)
            // Revert
            updateTasks(list_id, originalTasks);
        }
    }

    const handleUpdateTask = async (taskId: number, name: string, description: string, priority: string) => {
        // Optimistic update
        const originalTasks = [...tasks];
        updateTasks(list_id, tasks.map((task) =>
            task.id === taskId ? { ...task, name, description, priority } : task
        ));

        try {
            await axiosInstance.put(
                `api/v1/task/${board_id}/${list_id}/${taskId}`,
                { name, description, priority }
            )
            console.log("Task updated successfully")
        } catch (error) {
            console.error("Failed to update task:", error)
            // Revert
            updateTasks(list_id, originalTasks);
        }
    }

    return { taskName, setTaskName, taskDescription, setTaskDescription, handleCreateTask, tasks, handleDeleteTask, handleUpdateTask, priority, setPriority, deadline, setDeadline }

}

export default useTask
