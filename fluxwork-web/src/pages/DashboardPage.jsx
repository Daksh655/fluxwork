import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../services/api";
import { getAllTasks } from "../services/taskService";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const { activeBoardId } = useOutletContext();

    async function fetchTasks() {
        if (!activeBoardId) {
            setTasks([]);
            return;
        }
        try {
            const taskArray = await getAllTasks();
            const filteredData = (taskArray || []).filter(
                task => String(task.boardId) === String(activeBoardId)
            );
            setTasks(filteredData);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [activeBoardId]);

    const handleSubmitTask = async (taskDataFromModal) => {
        try {
            let finalDeadline = null;
            if (taskDataFromModal.deadline) {
                if (taskDataFromModal.deadline.includes("T")) {
                    finalDeadline = taskDataFromModal.deadline;
                } else {
                    finalDeadline = `${taskDataFromModal.deadline}T23:59:59`;
                }
            }

            const payload = {
                title: taskDataFromModal.title,
                description: taskDataFromModal.description,
                status: taskDataFromModal.status || "TODO",
                priority: taskDataFromModal.priority,
                deadline: finalDeadline,
                boardId: activeBoardId
            };

            // If it's an edit vs new task
            if (editingTask) {
                await api.put(`/api/tasks/${editingTask.id}`, payload);
            } else {
                await api.post('/api/tasks', payload);
            }

            await fetchTasks();

        } catch (error) {
            console.error("Failed to save task:", error);
            alert("Failed to save task! Check the console.");
        }
    };

    const handleMoveTask = async (taskId, newStatus) => {
        try {
            await api.put(`/api/tasks/${taskId}/status`, { status: newStatus });
            await fetchTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to update task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await api.delete(`/api/tasks/${taskId}`);
            await fetchTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to delete task");
        }
    };

    const todoTasks = tasks.filter(task => task.status === "TODO");
    const inProgressTasks = tasks.filter(task => task.status === "IN_PROGRESS");
    const doneTasks = tasks.filter(task => task.status === "DONE");

    return (
        <div>
            {/* Sleek Action Bar */}
            <div className="flex justify-start mb-6">
                {activeBoardId ? (
                    <button
                        onClick={() => {
                            setEditingTask(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm"
                    >
                        <span>➕</span> New Task
                    </button>
                ) : (
                    <div className="text-gray-400 italic bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
                        👈 Please create or select a Board from the sidebar to add tasks!
                    </div>
                )}
            </div>

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitTask}
                taskToEdit={editingTask}
            />

            {activeBoardId && tasks.length === 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-10 text-center mb-6">
                    <h3 className="text-xl text-white font-bold">
                        No tasks yet
                    </h3>
                    <p className="text-gray-400 mt-2">
                        Create your first task to get started.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TaskColumn
                    title="TODO"
                    color="text-yellow-400"
                    tasks={todoTasks}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                    }}
                />
                <TaskColumn
                    title="IN PROGRESS"
                    color="text-blue-400"
                    tasks={inProgressTasks}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                    }}
                />
                <TaskColumn
                    title="DONE"
                    color="text-green-400"
                    tasks={doneTasks}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                    }}
                />
            </div>
        </div>
    );
}

export default DashboardPage;