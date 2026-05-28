function TaskCard({ task, onMove, onDelete, onEdit }) {
    const priorityColors = {
        HIGH: "bg-red-500",
        MEDIUM: "bg-yellow-500",
        LOW: "bg-green-500"
    };

    return (
        <div className="group bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition duration-200 shadow-lg relative">

            {/* Header: Title & Action Buttons */}
            <div className="flex justify-between items-start">
                <h4 className="text-lg font-semibold text-white pr-12">
                    {task.title}
                </h4>

                {/* Hidden by default, appears on card hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-gray-400 hover:text-blue-400 transition"
                        title="Edit Task"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete Task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mt-2">
                {task.description}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs px-3 py-1 rounded-full text-white font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>

                <span className="text-xs text-gray-400 font-medium">
                    {task.deadline || "No Deadline"}
                </span>
            </div>

            {/* Movement Buttons */}
            <div className="flex gap-2 mt-4">
                {task.status === "TODO" && (
                    <button
                        onClick={() => onMove(task.id, "IN_PROGRESS")}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                    >
                        Start
                    </button>
                )}

                {task.status === "IN_PROGRESS" && (
                    <button
                        onClick={() => onMove(task.id, "DONE")}
                        className="bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                    >
                        Complete
                    </button>
                )}
            </div>
        </div>
    );
}

export default TaskCard;