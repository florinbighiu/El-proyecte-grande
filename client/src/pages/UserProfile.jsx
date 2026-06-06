import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserInfo } from "../api/userInfo";
import Loading from "../layout/Loading";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

const UserProfile = () => {
  const { isAdmin } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  if (!userInfo) return <Loading />;

  const role = userInfo.authorities?.[0]?.authority ?? "USER";

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="bg-white bg-opacity-40 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-28" />

        <div className="px-8 pb-8">
          <div className="-mt-14 mb-4 flex items-end gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold uppercase">
              {userInfo.username?.[0] ?? "U"}
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{userInfo.username}</h1>
              <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${isAdmin ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <InfoCard icon={<FiUser />} label="Username" value={userInfo.username} />
            <InfoCard icon={<FiMail />} label="Email" value={userInfo.email || "Not set"} />
            <InfoCard icon={<FiShield />} label="Role" value={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white bg-opacity-60 border border-gray-100 rounded-xl p-4 flex items-center gap-3">
    <div className="text-indigo-500 text-xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">{value}</p>
    </div>
  </div>
);

export default UserProfile;
