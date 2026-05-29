import { useEffect, useState } from "react";
import { getAllBoards } from "../services/boardService";

function Sidebar({ activeBoardId, setActiveBoardId }) {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        async function loadBoards() {
            try {
                const data = await getAllBoards();
                setBoards(data);
                // Automatically select the first board on initial load if none selected
                if (data.length > 0 && !activeBoardId) {
                    setActiveBoardId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to load boards:", error);
            }
        }
        loadBoards();
    }, [activeBoardId, setActiveBoardId]);

    return (
        <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col hidden md:flex">
            <div className="h-20 flex flex-col justify-center px-6 border-b border-gray-800">
                <h1 className="text-xl font-bold text-white tracking-wider">
                    Flux<span className="text-blue-500">Work</span>
                </h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                    Smart Task Management
                </p>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Your Boards
                </p>

                <div className="space-y-1">
                    {(boards || []).map((board) => (
                        <button
                            key={board.id}
                            onClick={() => setActiveBoardId(board.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition text-sm font-medium ${
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
        </aside>
    );
}

export default Sidebar;