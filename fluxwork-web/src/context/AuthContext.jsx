import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Prevents flickering before check
    const navigate = useNavigate();

    // Check if user exists on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        //  Save to local storage
        localStorage.setItem("user", JSON.stringify(userData));

        // Update React State
        setUser(userData);

        // Tell the GPS to drive to the dashboard!
        navigate("/dashboard");
    };

    const logout = () => {
        // Clear the storage
        localStorage.removeItem("user");

        // FORCE a full page reload to wipe all React memory
        window.location.href = "/login";
    };

    if (loading) return <div className="h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}