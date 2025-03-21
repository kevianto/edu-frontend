import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthLayout = ({ children, title, description, buttonText, buttonLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation and delayed navigation
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate(buttonLink);
      setIsAnimating(false);
    }, 500); // Delays navigation until animation completes
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[750px] h-[400px] bg-white shadow-lg rounded-lg overflow-hidden flex">
        
        {/* Forms Container */}
        <div className="relative flex w-full h-full">
          {/* Sign In Form (Left Side) */}
          <div className={`w-1/2 h-full flex items-center justify-center transition-opacity ${isSignUp ? "opacity-0" : "opacity-100"}`}>
            {!isAnimating && !isSignUp && children}
          </div>

          {/* Sign Up Form (Right Side) */}
          <div className={`w-1/2 h-full flex items-center justify-center transition-opacity ${isSignUp ? "opacity-100" : "opacity-0"}`}>
            {!isAnimating && isSignUp && children}
          </div>
        </div>

        {/* Animated Blue Overlay with Slightly Curved Edge */}
        <motion.div
          initial={{ x: isSignUp ? "100%" : "0%" }}
          animate={{ x: isSignUp ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white flex flex-col items-center justify-center text-center p-6 z-10 
            ${isSignUp ? "rounded-r-3xl" : "rounded-l-3xl"}`}
        >
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm mt-2">{description}</p>
          <button
            onClick={handleClick}
            className="mt-4 px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-indigo-700 transition"
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
