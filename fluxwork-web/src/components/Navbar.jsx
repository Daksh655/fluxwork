import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="h-20 flex items-center justify-between px-8 border-b border-gray-800 bg-gray-950/50 backdrop-blur-md">

            {/* Left Side: Welcome Message */}
            <div>
                <h2 className="text-xl font-bold text-white">
                    Welcome back, {user?.name} 👋
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                    Manage your workflow efficiently.
                </p>
            </div>

            {/* Right Side: User Info & Logout */}
            <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                    onClick={logout}
                    className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    Logout
                </button>
            </div>

        </header>
    );
}

export default Navbar;