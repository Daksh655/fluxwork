import { useEffect, useState } from "react";

import api from "../services/api";
import { getAllTasks } from "../services/taskService";

import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";

function DashboardPage() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    // FETCH TASKS
    async function fetchTasks() {

        try {

            const data = await getAllTasks();

            setTasks(data);

        } catch (error) {

            console.error(error);
        }
    }

    // LOAD TASKS
    useEffect(() => {

        async function loadData() {

            await fetchTasks();
        }

        loadData();

    }, []);

    // CREATE TASK
    const handleCreateTask = async () => {

        try {

            const taskData = {

                title,
                description,
                status: "TODO",
                priority: "MEDIUM",
                boardId: 2
            };

            await api.post(
                "/tasks",
                taskData
            );

            setTitle("");
            setDescription("");

            await fetchTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to create task");
        }
    };

    // MOVE TASK
    const handleMoveTask = async (
        taskId,
        newStatus
    ) => {

        try {

            await api.put(
                `/tasks/${taskId}/status`,
                {
                    status: newStatus
                }
            );

            await fetchTasks();

        } catch (error) {

            console.error(error);

            alert("Failed to update task");
        }
    };

    // FILTER TASKS
    const todoTasks = tasks.filter(
        task => task.status === "TODO"
    );

    const inProgressTasks = tasks.filter(
        task => task.status === "IN_PROGRESS"
    );

    const doneTasks = tasks.filter(
        task => task.status === "DONE"
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">

            {/* Navbar */}
            <Navbar user={user} />

            {/* Main Content */}
            <div className="p-8">

                {/* Welcome */}
                <div className="mb-8">

                    <h2 className="text-4xl font-bold">
                        Welcome back, {user?.name} 👋
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Manage your workflow efficiently.
                    </p>

                </div>

                {/* Create Task */}
                <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 mb-8 shadow-xl">

                    <h3 className="text-2xl font-semibold mb-4">
                        Create New Task
                    </h3>

                    <div className="flex gap-4">

                        <input
                            type="text"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 p-4 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex-1 p-4 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleCreateTask}
                            className="bg-blue-600 hover:bg-blue-700 transition px-8 rounded-xl font-semibold shadow-lg"
                        >
                            Add Task
                        </button>

                    </div>

                </div>

                {/* Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <TaskColumn
                        title="TODO"
                        color="text-yellow-400"
                        tasks={todoTasks}
                        onMove={handleMoveTask}
                    />

                    <TaskColumn
                        title="IN PROGRESS"
                        color="text-blue-400"
                        tasks={inProgressTasks}
                        onMove={handleMoveTask}
                    />

                    <TaskColumn
                        title="DONE"
                        color="text-green-400"
                        tasks={doneTasks}
                        onMove={handleMoveTask}
                    />

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;