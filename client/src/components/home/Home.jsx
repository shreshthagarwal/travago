import { Grid, Box, styled } from "@mui/material";
import Banner from "./Banner";
import Categories from "./Categories";
import Itenaries from "./Itenaries";

const CenterContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px"
});

const Home = () => {
    return (
        <>
            <Banner />
            <CenterContainer>
                <Categories />
            </CenterContainer>
            <Box>
                <Itenaries />
            </Box>
        </>
    );
};

export default Home;
