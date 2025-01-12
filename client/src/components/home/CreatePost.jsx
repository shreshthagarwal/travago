import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const initialPost = {
  title: "",
  destination: "",
  description: "",
  picture: "",
  name: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const { account } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const url = post.picture
    ? post.picture
    : "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await API.uploadFile(data);
          if (response.isSuccess) {
            setPost((prev) => ({ ...prev, picture: response.data }));
          } else {
            console.error("Error uploading the file:", response.msg);
          }
        } catch (error) {
          console.error("Error uploading the file:", error);
        }
      }
    };

    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.name = account.name;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const saveItinerary = async () => {
    setLoading(true);
    const response = await API.createItenary(post);
    setLoading(false);
    if (response.isSuccess) {
      navigate("/home");
    }
  };

  const CustomButton = ({ children, onClick, disabled, isLoading }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-3 text-white rounded-lg transition-all ${
        isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#AD9875] hover:bg-[#8C7B65]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-[#E2D2B8] flex justify-center items-center py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg m-5">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#AD9875]">
          Create a New Itenary
        </h2>

        <img
          src={url}
          alt="Itinerary Header"
          className="w-full h-40 object-cover rounded-lg mb-6"
        />

        <div className="space-y-4">
          {/* Upload Header Image */}
          <label
            htmlFor="fileInput"
            className="flex justify-center items-center gap-2 bg-[#E2D2B8] hover:bg-[#8C7B65] text-gray-700 py-3 px-4 rounded-lg border border-dashed border-gray-400 cursor-pointer"
          >
            Upload Header Image
          </label>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter Itenary Title"
            name="title"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD9875] focus:outline-none"
          />

          {/* Destination Input */}
          <input
            type="text"
            placeholder="Enter Destination"
            name="destination"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD9875] focus:outline-none"
          />

          {/* Description Input */}
          <textarea
            rows="4"
            placeholder="Tell us about your Itenary..."
            name="description"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD9875] focus:outline-none"
          ></textarea>

          {/* Publish Button */}
          <CustomButton
            onClick={saveItinerary}
            disabled={loading}
            isLoading={loading}
          >
            {loading ? "Saving..." : "Publish Itenary"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
