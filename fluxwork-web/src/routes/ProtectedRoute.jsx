import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
    const { user } = useContext(AuthContext);

    // If there is no user, kick them back to the login page immediately
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If they ARE logged in, open the gates and render the child components
    return <Outlet />;
}

export default ProtectedRoute;