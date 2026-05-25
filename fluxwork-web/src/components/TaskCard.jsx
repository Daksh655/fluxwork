function TaskCard({
                      task,
                      onMove
                  }) {

    const priorityColors = {

        HIGH: "bg-red-500",
        MEDIUM: "bg-yellow-500",
        LOW: "bg-green-500"
    };

    return (

        <div className="bg-gray-700 rounded-xl p-4 hover:bg-gray-600 transition duration-200 shadow-lg">

            {/* Title */}
            <h4 className="text-lg font-semibold text-white">
                {task.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-300 mt-2">
                {task.description}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">

                {/* Priority */}
                <span
                    className={`text-xs px-3 py-1 rounded-full text-white ${priorityColors[task.priority]}`}
                >
                    {task.priority}
                </span>

                {/* Deadline */}
                <span className="text-xs text-gray-400">
                    {task.deadline || "No Deadline"}
                </span>

            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

                {task.status === "TODO" && (

                    <button
                        onClick={() =>
                            onMove(task.id, "IN_PROGRESS")
                        }
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-sm"
                    >
                        Start
                    </button>
                )}

                {task.status === "IN_PROGRESS" && (

                    <button
                        onClick={() =>
                            onMove(task.id, "DONE")
                        }
                        className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg text-sm"
                    >
                        Complete
                    </button>
                )}

            </div>

        </div>
    );
}

export default TaskCard;