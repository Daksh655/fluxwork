import TaskCard from "./TaskCard";

function TaskColumn({ title, color, tasks, onMove, onDelete, onEdit }) {
    return (
        <div className="bg-gray-800 rounded-2xl p-4 min-h-[600px] border border-gray-700/50">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-bold ${color} tracking-wide`}>
                    {title}
                </h3>
                <span className="bg-gray-700/50 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                    {tasks.length}
                </span>
            </div>

            {/* Tasks Array */}
            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onMove={onMove}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>

        </div>
    );
}

export default TaskColumn;