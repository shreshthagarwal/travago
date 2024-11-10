import { Box, Button, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledButton = styled(Button)`
    margin: 10px;
    padding: 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-transform: none;
    &:hover {
        background-color: #e0e0e0;
    }
`;

const CategorySlider = styled(Box)`
    display: flex;
    overflow-x: auto;
    padding: 10px;
    gap: 15px;
    scroll-behavior: smooth;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <CategorySlider>
            {/* All Categories Button */}
            <Link to="/home">
                <StyledButton variant="outlined">
                    All Categories
                </StyledButton>
            </Link>

            {/* Create Itinerary Button */}
            

            {/* Category Buttons */}
            {categories.map(category => (
                <Link key={category.id} to={`/home?category=${category.type}`}>
                    <StyledButton>
                        {category.type}
                    </StyledButton>
                </Link>
            ))}

<Link to={`/home/create?category=${category || ""}`}>
                <StyledButton variant="filled" startIcon={<AddIcon />}>
                    Create an Itinerary
                </StyledButton>
            </Link>
        </CategorySlider>
    );
};

export default Categories;
