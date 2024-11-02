import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
border: 1px solid black;
`;

const StyledButton = styled(Button)`
margin: 20px;
width: 85%;

`;

const Categories = () => {

    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")
    return (
        <>
        <Link to={`/home/create?category=${category || ""}`}>
            <StyledButton variant="contained" startIcon={<AddIcon />}>
                Create an Itenary
            </StyledButton>
        </Link>
        

<StyledTable>
    <TableHead>
<TableRow>
    <TableCell>
        <Link to="/home">
            All Expenses
        </Link>
        
    </TableCell>
</TableRow>
    </TableHead>
    <TableBody>
        {
            categories.map(category=>(
                <TableRow key={category.id}>
                    <TableCell>
                        <Link to={`/home?category=${category.type}`}>
                            {category.type}
                        </Link>
                        
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>
</StyledTable>



        </>
    )
}

export default Categories