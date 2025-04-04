import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {username, email, password};

    const endpoint = 'http://localhost:3000/register'

    const fetchOptions = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
        credentials: 'include'
    }

    const response = await fetch(endpoint, fetchOptions);

    if (response.ok) {
        const data = await response.json();
        console.log('Registeration Successful', data);

        toast.success("Registeration Successful! Now Loggin In");
        console.log("Registration successful, attempting to navigate to /");

        navigate('/');
    }else {
        const errorData = await response.json();

        console.log("Registeration Failed: ", errorData);
        toast.error(errorData.error || "Registeration Failed. Please Try Again.");
    }

  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-10 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-light mb-8 text-center text-gray-800">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="John Doe"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-0 border-b border-gray-200 py-2 px-1 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 border-b border-gray-200 py-2 px-1 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-0 border-b border-gray-200 py-2 px-1 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-0 border-b border-gray-200 py-2 px-1 text-gray-800 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-all duration-200"
              required
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full bg-black text-white font-semibold py-3 px-5 rounded-md hover:bg-black/95 focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-gray-900 cursor-pointer transition-all duration-300 active:scale-95"
            >
              Register
            </button>
          </div>
          
          <div className="text-center mt-6">
            <Link to='/login'>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Already have an account? Login here
                </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;