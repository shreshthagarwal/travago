import { AppBar, Toolbar, styled } from "@mui/material"
import { Link } from "react-router-dom"

const Component = styled(AppBar)`
background: white;
`

const Container = styled(Toolbar)`
justify-content:center;
& > a {
padding: 20px;
text-decoration: none;
color: black;
font-weight: bold;
}
`

const Header = () => {
    return (
        <Component>
            <Container>
                <Link to="/home">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/">Logout</Link>
            </Container>
        </Component>
    )
}

export default Header