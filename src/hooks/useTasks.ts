import axiosInstance from "@/utils/axios"
import { useEffect, useState } from "react"

const useTask = (board_id: number, list_id: number) => {
    const [tasks, setTasks] = useState<any[]>([])
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [position, setPosition] = useState("")

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault()
        setTaskName("")
        setTaskDescription("")
        setPosition("")
        try {
            await axiosInstance.post(`/api/v1/task?board_id=${board_id}&list_id=${list_id}`, {
                name: taskName,
                description: taskDescription,
            })
            fetchTask()
            console.log("success");
        } catch (error) {
            console.log("reject");
        }
    }

    const fetchTask = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/task?board_id=${board_id}&list_id=${list_id}`)
            setTasks(res.data.data)
        } catch (error) {
            console.error("Failed to fetch boards:", error);
        }
    }
    

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axiosInstance.delete(
                `/api/v1/task/${taskId}?board_id=${Number(board_id)}&list_id=${list_id}&task_id=${taskId}`
            )
            setTasks((prev) => prev.filter((task) => task.id !== taskId))
            console.log("Task deleted successfully")
        } catch (error) {
            console.error("Failed to delete task:", error)
        }
    }

    const handleUpdateTask = async (taskId: number, name: string, description: string) => {
        try {
            const res = await axiosInstance.patch(
                `/api/v1/task/${taskId}?board_id=${board_id}&list_id=${list_id}&task_id=${taskId}`,
                { name, description }
            )
                setTasks((prev) =>
                prev.map((task) =>
                task.id === taskId ? { ...task, name, description } : task
                )
            )
            console.log("Task updated:", res.data)
        } catch (error) {
            console.error("Failed to update task:", error)
        }
    }

    useEffect(() => {
        fetchTask()
    }, [board_id, list_id])

    return { taskName, setTaskName, taskDescription, setTaskDescription, handleCreateTask, position, setPosition, tasks, handleDeleteTask, setTasks, fetchTask, handleUpdateTask }
}

export default useTask