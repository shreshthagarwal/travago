import { Box, Typography, styled } from "@mui/material";
import { addElipsis } from "../../utils/common-utils";

const Container = styled(Box)({
    border: '2px solid black',
    margin: '10px',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    height: '350px',
});

const Image = styled("img")({
    width: '100%',
    objectFit: 'cover',
    height: '150px',
    borderRadius: '10px 10px 0 0',
});

const Text = styled(Typography)({
    fontSize: '12px',
    color: 'gray',
});

const Heading = styled(Typography)({
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
});

const Description = styled(Typography)({
    fontSize: '14px',
    wordBreak: 'break-word',
    color: '#555',
});

const Itenary = ({ post }) => {
    return (
        <Container>
            <Image src={post.picture} alt="Header" />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title, 20)}</Heading>
            <Heading>{post.destination}</Heading>
            <Text>{post.name}</Text>
            <Description>{addElipsis(post.description, 100)}</Description>
        </Container>
    );
};

export default Itenary;
