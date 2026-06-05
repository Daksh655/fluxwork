import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {

    const [activeBoardId, setActiveBoardId] = useState(null);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">

            <Sidebar
                activeBoardId={activeBoardId}
                setActiveBoardId={setActiveBoardId}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col overflow-hidden">

                <Navbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet context={{ activeBoardId }} />
                </main>

            </div>
        </div>
    );
}

export default MainLayout;