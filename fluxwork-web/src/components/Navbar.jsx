function Navbar({ user }) {

    const handleLogout = () => {

        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    return (

        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <div>

                <h1 className="text-3xl font-bold text-white">
                    FluxWork
                </h1>

                <p className="text-sm text-gray-400">
                    Smart Task Management
                </p>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="text-white font-medium">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-400">
                        {user?.email}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;