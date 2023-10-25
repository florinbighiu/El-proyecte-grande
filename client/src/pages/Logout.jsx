
const Logout = () => {
  const logout = () => {
    localStorage.removeItem('authToken');

    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">Log Out</h2>
        <p className="text-gray-600 text-center">Are you sure you want to log out?</p>
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
