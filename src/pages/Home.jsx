import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();
  const blogRefs = useRef({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/blog`);
      setBlogs(data.blogs || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error fetching blogs",
      });
      setBlogs([]);
    }
  };

  const truncate = (text, maxLength = 150) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return diffInHours === 0
        ? "Just now"
        : `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const handleScrollToBlog = (id) => {
    blogRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Blogs section - 70% */}
        <div className="w-full md:w-[70%] space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                ref={(el) => (blogRefs.current[blog._id] = el)}
                className="flex flex-col md:flex-row border rounded-lg shadow p-4 gap-4"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Blog"
                    className="w-full md:w-48 h-40 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                  <p className="text-sm text-gray-500 mb-1">
                    By {blog.author?.name || "Unknown"} •{" "}
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleString()
                      : "No date"}
                  </p>
                  <p className="text-gray-700">{truncate(blog.description)}</p>
                  <button
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="text-blue-600 mt-2 hover:underline"
                  >
                    Read more
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available</p>
          )}
        </div>

        {/* Trending stories section - hidden on small screens */}
        <div className="hidden md:block md:w-[30%] border rounded-lg shadow p-4 h-fit sticky top-4">
          <h3 className="text-lg font-bold text-orange-600 mb-4">
            TRENDING NOW
          </h3>
          <ul className="space-y-4">
            {blogs.slice(0, 7).map((blog, index) => (
              <li key={blog._id} className="border-b pb-3 cursor-pointer">
                <div className="flex gap-2">
                  <span className="text-orange-600 font-bold text-lg">
                    {index + 1}
                  </span>
                  <div>
                    <p
                      onClick={() => handleScrollToBlog(blog._id)}
                      className="font-semibold leading-tight hover:underline line-clamp-2"
                    >
                      {blog.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {timeAgo(blog.createdAt)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
