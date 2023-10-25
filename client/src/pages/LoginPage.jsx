import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);

      if (response) {
        localStorage.setItem("authToken", response.data.jwt);
        localStorage.setItem("role", response.data.user.authorities[0].roleId);
        console.log(response.data.user.authorities[0].roleId)

        console.log("Login successful");
        navigate("/")
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold uppercase text-center text-gray-100 mb-6">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
              placeholder="Your username"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <button className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-purple-600" type="submit">
            Log In
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-gray-500 text-center">
          Dont have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
