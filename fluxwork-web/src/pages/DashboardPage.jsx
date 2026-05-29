import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"; // Import context hook
import axios from "axios";
import api from "../services/api";
import { getAllTasks } from "../services/taskService";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";

function DashboardPage() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Grab the active board ID from the Layout frame
    const { activeBoardId } = useOutletContext();

// FETCH TASKS
    async function fetchTasks() {
        if (!activeBoardId) return;
        try {
            // Call the service function we just updated
            const taskArray = await getAllTasks();

            // Perfect string match filtering for the active board
            const filteredData = (taskArray || []).filter(
                task => String(task.boardId) === String(activeBoardId)
            );

            setTasks(filteredData);
        } catch (error) {
            console.error("Failed to fetch tasks on dashboard:", error);
        }
    }

    // Automatically re-fetch data whenever the user switches boards!
    useEffect(() => {
        fetchTasks();
    }, [activeBoardId]);


    // SUBMIT TASK
    const handleSubmitTask = async (taskDataFromModal) => {
        try {
            let finalDeadline = null;
            if (taskDataFromModal.deadline) {
                finalDeadline = `${taskDataFromModal.deadline}T23:59:59`;
            }

            const payload = {
                title: taskDataFromModal.title,
                description: taskDataFromModal.description,
                status: taskDataFromModal.status || "TODO",
                priority: taskDataFromModal.priority,
                deadline: finalDeadline,
                boardId: activeBoardId
            };

            // Send payload to Spring Boot (Appends to localhost:8080 automatically)
            await axios.post('/api/tasks', payload);

            // Refresh the UI with the new data
            await fetchTasks();

        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    // MOVE TASK STATUS
    const handleMoveTask = async (taskId, newStatus) => {
        try {
            await api.put(`/tasks/${taskId}/status`, {
                status: newStatus
            });
            await fetchTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to update task");
        }
    };

    // DELETE TASK
    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await api.delete(`/tasks/${taskId}`);
            await fetchTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to delete task");
        }
    };

    // FILTER TASKS FOR COLUMNS
    const todoTasks = tasks.filter(task => task.status === "TODO");
    const inProgressTasks = tasks.filter(task => task.status === "IN_PROGRESS");
    const doneTasks = tasks.filter(task => task.status === "DONE");

    return (
        <div>
            {/* Sleek Action Bar */}
            <div className="flex justify-start mb-6">
                <button
                    onClick={() => {
                        setEditingTask(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm"
                >
                    <span>➕</span> New Task
                </button>
            </div>

            {/* The Smart Modal */}
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitTask}
                taskToEdit={editingTask}
            />

            {/* Columns */}
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