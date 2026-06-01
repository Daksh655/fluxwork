import { useState, useEffect } from "react";

function CreateTaskModal({ isOpen, onClose, onSubmit, taskToEdit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [deadline, setDeadline] = useState(""); // 1. Added Deadline State

    // Auto-fill inputs if we are editing
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || "");
            setPriority(taskToEdit.priority || "MEDIUM");
            setDeadline(taskToEdit.deadline || ""); // Auto-fill Deadline
        } else {
            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setDeadline("");
        }
    }, [taskToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        // Pass data back, ensuring we don't lose the status/boardId on edit!
        onSubmit({
            id: taskToEdit ? taskToEdit.id : null,
            title,
            description,
            priority,
            deadline,
            status: taskToEdit ? taskToEdit.status : "TODO",     // every task first status is TODO
            boardId: taskToEdit ? taskToEdit.boardId : 2         // Preserve boardId
        });

        onClose();
    };

    const isEditing = !!taskToEdit;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h3 className="text-2xl font-bold text-white mb-6">
                    {isEditing ? "Edit Task" : "Create New Task"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Task Title</label>
                        <input
                            type="text"
                            autoFocus
                            placeholder="e.g., Build the API"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                        <textarea
                            placeholder="Add some details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none h-20"
                        />
                    </div>

                    {/* priority and deadline are side by side */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                            >
                                <option value="LOW" className="bg-gray-900 text-white">Low</option>
                                <option value="MEDIUM" className="bg-gray-900 text-white">Medium</option>
                                <option value="HIGH" className="bg-gray-900 text-white">High</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-gray-300 font-medium hover:bg-gray-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg transition"
                        >
                            {isEditing ? "Save Changes" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTaskModal;