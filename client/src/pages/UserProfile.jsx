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
        <div className="bg-gray-100 w-4/5 h-3/5 py-2 my-12 rounded-lg">
            <div className="w-full mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="flex items-center mb-8 bg-pink-300 p-12 rounded-xl">
                    <img
                        src="https://avatars.githubusercontent.com/u/12345678?v=4"
                        alt="Profile"
                        className="rounded-full w-24 h-24 mr-4"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                        <p className="text-gray-600">john.doe@example.com</p>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
                    {/* Replace the following with real order data */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
                            <span>Order #12345</span>
                            <span>$150.00</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
                            <span>Order #67890</span>
                            <span>$80.00</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default UserProfile;
