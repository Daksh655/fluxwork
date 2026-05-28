import { Routes, Route, Navigate } from "react-router-dom"; // Navigateion
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Automatically redirect the root URL to the dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* The Bouncer (Protected Routes) */}
                <Route element={<ProtectedRoute />}>
                    {/* The Frame (Layout) */}
                    <Route element={<MainLayout />}>
                        {/* The Actual Pages */}
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;