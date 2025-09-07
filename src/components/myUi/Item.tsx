import React, { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "../ui/button"

type ItemProps = {
    id: number
    content: string
    isDone?: boolean
    onUpdateItem: (id: number, newContent: string) => void
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

const Item: React.FC<ItemProps> = ({
    id,
    content,
    isDone,
    onUpdateItem,
    onDelete,
    onToggle,
}) => {
    const [editing, setEditing] = useState(false)
    const [newContent, setNewContent] = useState(content)

    return (
        <div className="flex items-center gap-2 p-2 border-b">
            <input
                type="checkbox"
                onChange={() => { onToggle?.(id)}}
                checked={isDone}
                className="w-4 h-4 rounded-full"
            />

            {editing ? (
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        onUpdateItem?.(id, newContent)
                    }}
                    className="flex gap-2 w-full">
                    <input
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                    />
                    <Button type="submit" className="text-sm text-white bg-primary">Save</Button>
                    <Button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="text-sm text-white bg-secondary hover:bg-secondary-shade"
                    >
                        Cancel
                    </Button>
                </form>
            ) : (
                <>
                    <span
                        onDoubleClick={() => setEditing(true)}
                        className={`hover:bg-zinc-100 p-3 flex-1 ${isDone ? "line-through text-gray-400" : ""}`}
                    >
                        {content}
                    </span>
                    <Trash
                        size={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() => onDelete(id)}
                    />
                </>
            )}
        </div>
    )
}

export default Item