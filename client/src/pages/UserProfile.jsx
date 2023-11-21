import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';

import { getUserInfo } from '../api/userInfo';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserInfo(setUserInfo);
    }, []);

    if (!userInfo) {
        console.log('User info is null');
        return <Loading />;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-6xl text-center font-bold my-12">{`Welcome, ${userInfo.username}!`}</h1>
            <div className="flex flex-col md:flex-row items-center bg-white bg-opacity-25 p-3 rounded-lg">
                <div className='m-5'>
                    <img src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-user-icon-person-head-icons-anonymous-male-female-businessman-photo-placeholder-social-network-272206807.jpg" 
                    alt="User avatar"
                    className="w-32 h-32 rounded-full mr-4" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-row space-x-12 items-center justify-around">
                    <div className="mb-4">
                        <strong>Username:</strong> {userInfo.username}
                    </div>

                    <div className="mb-4">
                        <strong>Email:</strong> {userInfo.email || 'Not available'}
                    </div>

                    <div className="mb-4">
                        <strong>Role:</strong> {userInfo.authorities[0]?.authority || 'User'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
