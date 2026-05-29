import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 👈 1. Bring the GPS back
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // 👈 2. Turn the GPS on

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);

            // Save the token to your context
            login(response.data);
            // transport to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-4">
                <h1 className="text-white text-3xl font-bold text-center">Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;