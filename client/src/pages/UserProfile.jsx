import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("authToken")

    useEffect(() => {
        axios.get(`https://el-proyecte-grande-osxq.onrender.com/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUserInfo(res.data))
            .catch()

    }, []);

    return (
        <div className="container min-h-full mt-8 bg-gray-100 rounded-lg shadow-lg">
            {userInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1 ">
                    <div className="w-full p-4 col-span-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-lg">
                        <div className="mb-4 ">
                            <img
                                src={"https://st3.depositphotos.com/7486768/17806/v/450/depositphotos_178065822-stock-illustration-profile-anonymous-face-icon-gray.jpg"}
                                alt="User Avatar"
                                className="w-32 h-32 rounded-full mx-auto"
                            />
                        </div>
                        <div className="text-center p-4">
                            <h2 className="text-xl font-bold">{userInfo.username}</h2>
                            <p className="text-gray-600">{userInfo.email}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="bg-white h-full p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Profile Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Username</p>
                                    <p className="text-lg font-medium">{userInfo.username}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-lg font-medium"></p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Authority</p>
                                    <p className="text-lg font-medium">{userInfo.authorities[0].authority}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
