import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function LoginPage() {

    const navigate = useNavigate();

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

            const response = await api.post(
                "/auth/login",
                formData
            );

            console.log(response.data);

            alert("Login successful!");

            // store logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data)
            );

            // redirect to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-4"
            >

                <h1 className="text-white text-3xl font-bold text-center">
                    Login
                </h1>

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

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default LoginPage;