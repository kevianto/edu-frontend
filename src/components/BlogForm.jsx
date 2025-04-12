import { useState } from "react";

const BlogForm = ({ formData, setFormData, onSubmit, onClose, editing }) => {
  const [localImage, setLocalImage] = useState(formData.image || null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">
          {editing ? "Edit Blog" : "Add Blog"}
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded mb-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded mb-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <input
            type="file"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
              setLocalImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {localImage && (
            <img
              src={
                typeof localImage === "string"
                  ? localImage
                  : URL.createObjectURL(localImage)
              }
              alt="Preview"
              className="w-full h-40 object-cover mb-2"
            />
          )}
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {editing ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
