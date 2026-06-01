import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-blue-500">
                Loading...
            </div>
        );
    }


    if (!user) { // If there is no user, move them back to the login page immediately
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;