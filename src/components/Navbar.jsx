import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleManageBlogs = () => {
    if (!token) {
      navigate("/signin"); // Strictly redirect to Sign In page
    } else {
      navigate("/manageblogs"); // Redirect to Manage Blogs page
    }
  };

  const handleSignIn = () => {
    navigate("/signin"); // Redirect to Sign In page
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user session
    navigate("/"); // Redirect to Home page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Left: Logo & Title */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="EduVibes Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">EduVibes</span>
      </div>

      {/* Right: Buttons */}
      <div className="flex space-x-4">
        {!token ? (
          // Show Sign In Button if user is NOT logged in
          <button
            onClick={handleSignIn}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        ) : (
          <>
            {/* Show Manage Blogs only if user is logged in */}
            <button
              onClick={handleManageBlogs}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Manage Blogs
            </button>

            {/* Show Logout Button when user is logged in */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
