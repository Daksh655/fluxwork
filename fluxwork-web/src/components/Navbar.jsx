import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-800 bg-gray-950/50 backdrop-blur-md">

            {/* Left Side */}
            <div className="flex items-center gap-4">

                {/* Mobile Hamburger */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-white text-2xl"
                >
                    ☰
                </button>

                <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">
                        Welcome back, {user?.name} 👋
                    </h2>

                    <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                        Manage your workflow efficiently.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">

                {/* Avatar */}
                <Link
                    to="/profile"
                    className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition cursor-pointer"
                >
                    {user?.name?.charAt(0)?.toUpperCase()}
                </Link>

                <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-white">
                        {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user?.email}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    Logout
                </button>

            </div>
        </header>
    );
}

export default Navbar;