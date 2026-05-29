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

    // If there is no user, kick them back to the login page immediately
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If they ARE logged in, open the gates and render the child components
    return <Outlet />;
}

export default ProtectedRoute;