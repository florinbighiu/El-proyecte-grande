import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const SignupPage = () => {
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

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate("/login")
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-extrabold uppercase text-center text-gray-100 mb-6">Get Started</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-2">
            <label htmlFor="username" className="block text-gray-200 text-sm font-semibold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none"
              placeholder="Your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-200 text-sm font-semibold">Password</label>
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
            Sign Up
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
