import { useState } from "react";
import api from "../services/api";

function RegisterPage() {

    const [formData, setFormData] = useState({ // Stores form data inside React state.
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {  //  Updates input values dynamically.

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => { // runs when form is submits

        e.preventDefault();

        try {

            const response = await api.post( // Calls backend API using axios
                "/api/auth/register",
                formData
            );

            console.log(response.data);

            alert("User registered successfully!");

        } catch (error) {

            console.error(error);

            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl w-full max-w-md space-y-4"
            >

                <h1 className="text-white text-3xl font-bold text-center">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                />

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
                    Register
                </button>

            </form>

        </div>
    );
}

export default RegisterPage;