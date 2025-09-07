import axiosInstance from "@/utils/axios"
import React, { useEffect, useState } from "react"

const useItem = (board_id: number, list_id: number, task_id: number) => {
    const [items, setItems] = useState<any[]>([])
    const [content, setContent] = useState("")

    const fetchItems = async () => {
        try {
            const res = await axiosInstance.get(`api/v1/task/${board_id}/${list_id}/${task_id}`)
            
            setItems(res.data.data.item)
        } catch (error) {
            console.log("error")
        }
    }

    const createItems = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axiosInstance.post(`/api/v1/item/${board_id}/${list_id}/${task_id}`, {
                content 
            })
            setContent("")
            await fetchItems()
        } catch (error) {
            console.log(error);
        }
    }

    const updateItem = async (itemId: number, newContent: string) => {
        try {
            await axiosInstance.patch(
                `/api/v1/item/update/${board_id}/${list_id}/${task_id}/${itemId}`,
                { content: newContent }
            )
            await fetchItems()
        } catch (error) {
            console.log(error)
        }
    }

     const deleteItem = async (itemId: number) => {
        try {
            await axiosInstance.delete(
                `/api/v1/item/${board_id}/${list_id}/${task_id}/${itemId}`
            )
            await fetchItems()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleItem = async (itemId: number) => {
        try {
            await axiosInstance.patch(`/api/v1/item/${board_id}/${list_id}/${task_id}/${itemId}`)
            await fetchItems()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [board_id, list_id, task_id])

    return { items, content, setContent, createItems, updateItem, toggleItem, deleteItem }
}

export default useItem