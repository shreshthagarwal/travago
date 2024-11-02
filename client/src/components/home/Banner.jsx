import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
    background: url('https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56103.jpg?size=626&ext=jpg');
    margin-top: 65px;
    width: 100%;
    height: 20vh;
    display: flex; 
    align-items: center;
    justify-content: center; 
    background-size: cover; 
`;

const Heading = styled(Typography)`
font-size: 60px;
`;

const Banner = () => {
    return (
        <Image>
            <Heading>TRIPONARY</Heading>
        </Image>
    );
}

export default Banner;
