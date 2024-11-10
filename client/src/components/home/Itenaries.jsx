import { useState, useEffect } from "react";
import { API } from "../../service/api";
import { Box, Grid } from "@mui/material";
import Itenary from "./Itenary";
import { useSearchParams, Link } from "react-router-dom";

const Itenaries = () => {
    const [itenary, setItenary] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getItenaries({ category: category || "" });
            if (response.isSuccess) {
                setItenary(response.data);
            }
        };
        fetchData();
    }, [category]);

    return (
        <>
            {itenary && itenary.length > 0 ? (
                <Grid container spacing={2}>
                    {itenary.map((post) => (
                        <Grid item lg={3} sm={4} xs={12} key={post._id}>
                            <Link to={`/home/details/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <Itenary post={post} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box textAlign="center" marginTop="20px">No Itineraries posted yet!!</Box>
            )}
        </>
    );
};

export default Itenaries;
