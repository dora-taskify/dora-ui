import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import axiosInstance from "@/utils/axios"

type NotificationType = {
    id: number
    title: string
    message: string
    created_at: string
}

const Notification = ({ profileId }: { profileId: number }) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/notifications/${profileId}`)
                setNotifications(res.data.data)
            } catch (error) {
                console.error("Gagal ambil notif:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNotifications()
    }, [profileId])

    if (loading) return <p className="text-sm text-gray-500 px-2">Loading...</p>
    if (notifications.length === 0) return <p className="text-sm text-gray-500 px-2">No notifications</p>

    return (
        <div className="flex flex-col gap-2">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="p-2 rounded-lg hover:bg-zinc-100 cursor-pointer transition"
                    >
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-gray-600">{notif.message}</p>
                    <span className="text-[10px] text-gray-400">
                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default Notification
