import { Grid } from "@mui/material";
import Banner from "./Banner";
import Categories from "./Categories";
import Itenaries from "./Itenaries";

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories />
                </Grid>
                <Grid item lg={10} sm={10} xs={12}>
                    <Itenaries />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
