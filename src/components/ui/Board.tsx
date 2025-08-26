const Board = () => {
    const columns = [
        { title: "To Do"},
        { title: "In Progress"},
        { title: "Done"},
        { title: "To Do"},
        { title: "In Progress"},
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 max-w-235">
            {columns.map((col, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-zinc-300 overflow-hidden mb-10">
                    <div className="h-22 w-full overflow-hidden bg-zinc-200">
                    </div>

                    <div className="p-4">
                        <h2>{col.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Board;
