import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm"; // Adjust the path based on your folder structure

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const { data } = await axios.get(`${API_URL}/blog/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(data.blogs || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error fetching your blogs",
      });
    }
  };

  const uploadImage = async (file) => {
    const cloudName = "daxghemr4";
    const uploadPreset =
      "system_uploader_1e2ddab171f769b9_cad99bc8ef0968685f81cc25a118dfff9c";

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", uploadPreset);

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      return data.secure_url;
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading image" });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image;

    if (formData.image && typeof formData.image !== "string") {
      imageUrl = await uploadImage(formData.image);
      if (!imageUrl) return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const url = editingBlog
        ? `${API_URL}/blog/${editingBlog._id}`
        : `${API_URL}/blog`;

      const method = editingBlog ? "put" : "post";

      const { data } = await axios[method](
        url,
        {
          title: formData.title,
          description: formData.description,
          image: imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage({ type: "success", text: data.message });
      setFormData({ title: "", description: "", image: null });
      setEditingBlog(null);
      setShowModal(false);
      fetchMyBlogs();
    } catch (error) {
      setMessage({ type: "error", text: "Error processing request" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: "Blog deleted successfully" });
      fetchMyBlogs();
    } catch (error) {
      setMessage({ type: "error", text: "Error deleting blog" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Manage Your Blogs</h1>

      {message.text && (
        <div
          className={`p-3 mb-4 text-white rounded ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setFormData({ title: "", description: "", image: null });
          setEditingBlog(null);
          setShowModal(true);
        }}
      >
        Add Blog
      </button>

      <div className="grid md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
            {blog.image && (
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-48 object-cover my-2"
              />
            )}
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => {
                setFormData({
                  title: blog.title,
                  description: blog.description,
                  image: blog.image,
                });
                setEditingBlog(blog);
                setShowModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(blog._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingBlog(null);
          }}
          editing={editingBlog}
        />
      )}
    </div>
  );
};

export default ManageBlogs;
