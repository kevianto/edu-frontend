import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = ( ) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();
// useeffect to fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/blog`); 
      setBlogs(data.blogs || []);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Error fetching blogs" });
      setBlogs([]);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      {message.text && (
        <div
          className={`p-3 mb-4 text-white rounded ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p>{blog.description}</p>
              {blog.image && (
                <img src={blog.image} alt="Blog" className="w-full h-48 object-cover my-2" />
              )}
              <p className="text-sm text-gray-500">By {blog.author?.name || "Unknown"}</p>
              <p className="text-sm text-gray-500">
                {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "No date available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
