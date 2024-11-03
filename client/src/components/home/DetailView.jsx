import { Box, Typography, styled } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { API } from "../../service/api"

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

// const EditIcon = styled(Edit)`
//     margin: 5px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

// const DeleteIcon = styled(Delete)`
//     margin: 5px;
//     padding: 5px;
//     border: 1px solid #878787;
//     border-radius: 10px;
// `;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 20px 0 10px 0;
    break-word: word-break;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {

    const [post, setPost] = useState({});
    const {id} = useParams()
    const url = post.picture ? post.picture : "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg"
    
    useEffect(()=> {
        const fetchData = async () => {
            let response = await API.getPostById(id)
            if (response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData()
    },[])

    return (
        <Container>
            <Image src={url} alt="header" />
            <Heading>{post.title}</Heading>
            <Heading>{post.destination}</Heading>
            <Box>
                <Author>Author: {post.name}</Author>
                <Author>{new Date(post.createdDate).toDateString()}</Author>
            </Box>
            <Typography>{post.description}</Typography>
        </Container>
    )
}

export default DetailView