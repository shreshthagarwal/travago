import AddIcon from "@mui/icons-material/Add";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

// Custom Button Component
const CustomButton = ({ children, to, isContained, startIcon }) => {
  return (
    <Link to={to}>
      <button
        className={`w-full py-2 px-4 rounded-lg 
          ${isContained ? "bg-[#ad9875] text-white" : "bg-white text-gray-700 border-2 border-[#ad9875]"} 
          hover:bg-[#AD9875] hover:text-white transition-all`}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
      </button>
    </Link>
  );
};

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="bg-[#E2D2B8] rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* All Categories Button */}
        <CustomButton to="/home">All Categories</CustomButton>

        

        {/* Category Buttons */}
        {categories.map((cat) => (
          <CustomButton key={cat.id} to={`/home?category=${cat.type}`}>
            {cat.type}
          </CustomButton>
        ))}

        {/* Create Itinerary Button */}
        <CustomButton
          to={`/home/create?category=${category || ""}`}
          isContained={true}
          startIcon={<AddIcon />}
        >
          Create an Itinerary
        </CustomButton>
      </div>
    </div>
  );
};

export default Categories;