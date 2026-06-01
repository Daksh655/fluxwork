import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">

            {/* ALIVE BACKGROUND EFFECT: Glowing pulsing orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-wider">
                        Flux<span className="text-blue-500">Work</span>
                    </span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium transition">
                        Log In
                    </Link>
                    <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-bold transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-4xl mx-auto">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase shadow-sm">
                    v1.0 Now Live
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                    Smart workflows for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        unstoppable productivity.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                    A secure, personal workspace to organize your tasks, manage your projects, and keep your life in perfect sync. Built for speed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-4 rounded-xl font-bold text-lg transition shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                        Start Building Free
                    </Link>
                </div>

                {/* Sleek Kanban Mockup (Replaces the text box) */}
                <div className="mt-20 w-full max-w-4xl rounded-2xl border border-gray-800/60 bg-gray-900/40 p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    {/* Abstract columns representing TODO, IN PROGRESS, DONE */}
                    <div className="grid grid-cols-3 gap-6 h-64 md:h-80 opacity-70 pt-4">
                        {/* Column 1 */}
                        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 flex flex-col gap-3">
                            <div className="h-3 w-16 bg-yellow-500/50 rounded-full mb-2"></div>
                            <div className="h-20 bg-gray-700/50 rounded-lg w-full"></div>
                            <div className="h-24 bg-gray-700/50 rounded-lg w-full"></div>
                        </div>
                        {/* Column 2 */}
                        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 flex flex-col gap-3 mt-4">
                            <div className="h-3 w-24 bg-blue-500/50 rounded-full mb-2"></div>
                            <div className="h-28 bg-gray-700/50 rounded-lg w-full border border-blue-500/30"></div>
                        </div>
                        {/* Column 3 */}
                        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50 flex flex-col gap-3">
                            <div className="h-3 w-12 bg-green-500/50 rounded-full mb-2"></div>
                            <div className="h-16 bg-gray-700/50 rounded-lg w-full"></div>
                            <div className="h-20 bg-gray-700/50 rounded-lg w-full"></div>
                            <div className="h-16 bg-gray-700/50 rounded-lg w-full"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;