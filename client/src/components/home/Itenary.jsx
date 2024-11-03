import { Box, Typography, styled } from "@mui/material"
import { addElipsis } from "../../utils/common-utils"

const Container = styled(Box)`
border: 2px solid black;
margin: 10px;
padding: 10px;
border-radius: 10px;
text-align: center;
height: 350px;
`

const Image = styled("img")({
    width: '100%',
    objectFit: "cover",
    height: "150px"
})

const Text = styled(Typography)`
font-size: 12px;
`
const Heading = styled(Typography)`
font-size: 18px;
`
const Description = styled(Typography)`
font-size: 14px;
word-break: break-word;
`

const Itenary = ({post}) => {
    return (
        <Container>
            <Image src={post.picture} alt="Header"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Heading>{post.destination}</Heading>
            <Text>{post.name}</Text>
            <Description>{addElipsis(post.description,100)}</Description>


        </Container>
    )
}

export default Itenary