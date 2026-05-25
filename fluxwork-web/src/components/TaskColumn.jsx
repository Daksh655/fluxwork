import TaskCard from "./TaskCard";

function TaskColumn({
                        title,
                        color,
                        tasks,
                        onMove
                    }) {

    return (

        <div className="bg-gray-800 rounded-2xl p-4 min-h-[600px]">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h3 className={`text-xl font-bold ${color}`}>
                    {title}
                </h3>

                <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
                    {tasks.length}
                </span>

            </div>

            {/* Tasks */}
            <div className="space-y-4">

                {tasks.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                        onMove={onMove}
                    />
                ))}

            </div>

        </div>
    );
}

export default TaskColumn;