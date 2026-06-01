import { useEffect, useState } from "react";
import { getAllBoards, createBoard } from "../services/boardService";

function Sidebar({ activeBoardId, setActiveBoardId }) {
    const [boards, setBoards] = useState([]);

    // UI State for sleek creation
    const [isCreating, setIsCreating] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        async function loadBoards() {
            try {
                const data = await getAllBoards();
                setBoards(data);
                if (data.length > 0 && !activeBoardId) {
                    setActiveBoardId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to load boards:", error);
            }
        }
        loadBoards();
    }, [activeBoardId, setActiveBoardId]);

    // Show a sleek notification for 3 seconds
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const submitNewBoard = async () => {
        if (!newBoardName || !newBoardName.trim()) {
            setIsCreating(false);
            return;
        }

        try {
            await createBoard({
                name: newBoardName,
                description: "My new workspace"
            });

            const freshBoards = await getAllBoards();
            setBoards(freshBoards);

            if (freshBoards.length > 0) {
                setActiveBoardId(freshBoards[freshBoards.length - 1].id);
            }

            // Reset UI and show success toast!
            setNewBoardName("");
            setIsCreating(false);
            showNotification(`Board "${newBoardName}" created successfully!`);

        } catch (error) {
            console.error("Failed to create board:", error);
            alert("Failed to create board. Check your console!");
        }
    };

    return (
        <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col hidden md:flex relative">
            <div className="h-20 flex flex-col justify-center px-6 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white tracking-wider">
                    Flux<span className="text-blue-500">Work</span>
                </h1>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pr-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Your Boards
                    </p>
                    <button
                        onClick={() => setIsCreating(!isCreating)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800 h-6 w-6 flex items-center justify-center rounded transition"
                        title="Create New Board"
                    >
                        {isCreating ? "✕" : "➕"}
                    </button>
                </div>

                <div className="space-y-1">
                    {/* Inline Creation Input */}
                    {isCreating && (
                        <div className="mb-2">
                            <input
                                type="text"
                                autoFocus
                                placeholder="Board name..."
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && submitNewBoard()}
                                className="w-full bg-gray-900 border border-blue-500 text-white text-sm rounded-lg px-3 py-2 outline-none"
                            />
                        </div>
                    )}

                    {(boards || []).map((board) => (
                        <button
                            key={board.id}
                            onClick={() => setActiveBoardId(board.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition text-sm font-medium truncate ${
                                activeBoardId === board.id
                                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent"
                            }`}
                        >
                            # {board.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sleek System Notification (Toast) */}
            {notification && (
                <div className="absolute bottom-6 left-4 right-4 bg-green-900/90 border border-green-500 text-green-100 px-4 py-3 rounded-lg shadow-2xl text-sm font-medium animate-bounce">
                    ✅ {notification}
                </div>
            )}
        </aside>
    );
}

export default Sidebar;