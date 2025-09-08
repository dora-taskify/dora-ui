interface ArchivedListProps {
  id: number;
  name: string;
  description?: string;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

const ArchivedList = ({ id, name, description, onRestore, onDelete }: ArchivedListProps) => {
    return (
        <>
        <div className="p-4 border border-zinc-200 rounded-lg bg-white shadow-sm flex flex-col gap-2">
            <h3 className="font-semibold">{name}</h3>
            {description && <p className="text-sm text-gray-500">{description}</p>}
            <p>archived</p>
        </div>
            <div className="flex gap-2 mt-2 text-zinc-800 underline px-2">
                <p className="cursor-pointer hover:text-zinc-700" onClick={() => onRestore(id)}>
                    Restore
                </p>
                <p className="cursor-pointer hover:text-zinc-700" onClick={() => onDelete(id)}>
                    Delete
                </p >
            </div>
        </>
    );
};

export default ArchivedList;
