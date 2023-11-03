const PasswordReset = () => {
  return (
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-red-400"
              placeholder="Your email"
            />
          </div>
          <button className="w-full bg-red-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-red-600">
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
