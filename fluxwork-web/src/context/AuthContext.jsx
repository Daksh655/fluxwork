import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Prevents flickering before check
    const navigate = useNavigate();


    useEffect(() => {
        console.log("AUTH CONTEXT LOADED");

        const storedUser = localStorage.getItem("user");

        console.log("STORED USER:", storedUser);

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    const login = (userData) => {

        localStorage.setItem("user", JSON.stringify(userData)); //  Save to local storage

        setUser(userData); // Update React State

        navigate("/dashboard"); // Tell the GPS to drive to the dashboard!
    };

    const logout = () => {

        localStorage.removeItem("user"); // Clear the storage
        window.location.href = "/";  // force a full page reload to wipe all React memory
    };

    if (loading) return <div className="h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}