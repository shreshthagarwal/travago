import { useState, useEffect, useContext } from "react";
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled (Box)`
margin: 15px;
`

const Image = styled("img")({
    width: "100%",
    height: "40vh",
    objectFit: "cover" 
})

const Input = styled("label")({
    fontSize: "large",
    backgroundColor: "beige",
    borderRadius: "10px",
    padding: "10px",
    border: "1px dashed black",
    margin: "10px",
    display: "flex",
    alignItems: "center",
    width: "20vh"
})

const StyledFormControl = styled(FormControl)`
margin: 10px; display: flex; flex-direction: column; text-align: center; justify-content: center;
`;

const initialPost = {
    title: "",
    destination: "",
    description: "",
    picture: "",
    name: "",
    categories: "",
    createdDate: new Date()

}

const CreatePost = () => {

    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState("")
    const {account} = useContext(DataContext)
    const location = useLocation();
    const navigate  = useNavigate();

    const url = post.picture ? post.picture :  "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg"


    useEffect(()=> {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);  // Add file name
                data.append("file", file);       // Append the file itself
        
                try {
                    const response = await API.uploadFile(data);
                    if (response.isSuccess) {
                        setPost(prev => ({ ...prev, picture: response.data }));
                    } else {
                        console.error("Error uploading the file:", response.msg);
                    }
                } catch (error) {
                    console.error("Error uploading the file:", error);
                }
            }
        };
        
        getImage()
        post.categories= location.search?.split("=")[1] || "All";
        post.name = account.name;
    }, [file])

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const saveItenary = async () => {
        let response = await API.createItenary(post);
        if (response.isSuccess){
            navigate("/home")
        }
    }

    return (
        <Container>
            <Image src={url} ></Image>

            <StyledFormControl>
                <Input htmlFor="fileInput">
                    Input Header Image <CloudUploadIcon fontSize="medium"/>
                </Input>
                <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])} />

                <InputBase placeholder="Enter Itenary Title" onChange={(e)=> handleChange(e)} name="title"/>
                <InputBase placeholder="Enter Destination" onChange={(e)=> handleChange(e)}  name="destination"/>
                

                <TextareaAutosize minRows={10} placeholder="Tell us about your Itenary..." onChange={(e)=> handleChange(e)} name="description"/>

                <Button variant="contained" onClick={()=> saveItenary()}>Publish Itenary</Button>

            </StyledFormControl>

        </Container>
    )
}

export default CreatePost;