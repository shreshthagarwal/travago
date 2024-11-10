import { useState, useEffect, useContext } from "react";
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const PageContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
    padding-top: 70px;

  background-color: #f9fafb;
`;

const Container = styled(Box)`
  width: 100%;
  max-width: 600px;
  
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled("img")({
  width: "100%",
  height: "40vh",
  objectFit: "cover",
  borderRadius: "8px",
});

const Input = styled("label")({
  fontSize: "large",
  backgroundColor: "beige",
  borderRadius: "10px",
  padding: "10px",
  border: "1px dashed black",
  margin: "10px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "center",
});

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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

  return (
    <PageContainer>
      <Container>
        <h2 className="text-2xl font-semibold text-center mb-6">Add a New Itinerary</h2>
        <Image src={url} alt="Itinerary Header" />
        
        <StyledFormControl>
          <Input htmlFor="fileInput">
            Upload Header Image <CloudUploadIcon fontSize="medium" />
          </Input>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

          <InputBase
            placeholder="Enter Itinerary Title"
            onChange={(e) => handleChange(e)}
            name="title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <InputBase
            placeholder="Enter Destination"
            onChange={(e) => handleChange(e)}
            name="destination"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <TextareaAutosize
            minRows={4}
            placeholder="Tell us about your Itinerary..."
            onChange={(e) => handleChange(e)}
            name="description"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <Button
            variant="contained"
            onClick={saveItinerary}
            disabled={loading}
            className={`px-6 py-3 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600'} rounded-lg hover:bg-blue-700 transition-colors`}
          >
            {loading ? "Saving..." : "Publish Itinerary"}
          </Button>
        </StyledFormControl>
      </Container>
    </PageContainer>
  );
};

export default CreatePost;
