import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const SignIn = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token); 
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Hello, Friend!"
      description="Register with your personal details to use all site features."
      buttonText="SIGN UP"
      buttonLink="/signup"
    >
      <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold">Sign In</h2>
        
        <p className="text-sm mt-2">Use your email and password</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full px-4 py-2 mt-2 border rounded" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-2 mt-2 border rounded" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          onClick={handleLogin}
          className="mt-4 px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition"
        >
          SIGN IN
        </button>
      </div>
    </AuthLayout>
  );
};

export default SignIn;

