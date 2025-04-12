import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const SignUpForm = (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Create Account</h2>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      <p className="text-sm mt-2">Use your email for registration</p>
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 mt-4 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={handleSignUp}
        className="mt-4 px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition"
      >
        SIGN UP
      </button>

      {/* Sign In link for small screens */}
      <p className="mt-4 text-sm lg:hidden">
        Already have an account?{" "}
        <Link to="/signin" className="text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop view with AuthLayout */}
      <div className="hidden lg:block">
        <AuthLayout
          title="Welcome Back!"
          description="Enter your personal details to use all site features."
          buttonText="SIGN IN"
          buttonLink="/signin"
        >
          {SignUpForm}
        </AuthLayout>
      </div>

      {/* Mobile view without AuthLayout */}
      <div className="block lg:hidden">{SignUpForm}</div>
    </>
  );
};

export default SignUp;
