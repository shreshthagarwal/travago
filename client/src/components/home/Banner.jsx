import { Box, styled } from "@mui/material";
import logo from "../../assets/Logo2.png"

// Banner container with new color and improved layout
const Image = styled(Box)({
    backgroundColor: '#fff1da',  // Modern soft background color
    marginTop: '65px',
    width: '100%',
    height: '20vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',  // Smooth corners for a modern touch
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
});

// Logo image styling (bigger logo)
const Logo = styled('img')({
    maxWidth: '450px',  // Adjust the size as needed
    height: 'auto',  // Maintain aspect ratio
});

const Banner = () => {
    return (
        <Image>
            {/* Logo image centered */}
            <Logo src={logo} alt="Logo" />
        </Image>
    );
}

export default Banner;
