import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h1 className="text-3xl font-bold mb-6">
                    Profile
                </h1>

                <div className="space-y-4">
                    <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-xl">{user?.name}</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-xl">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;