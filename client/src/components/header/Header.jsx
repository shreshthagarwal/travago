import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data (if any)
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-[#ffffff] p-4 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-30 h-14 mr-3" />
              </div>

      {/* Navigation Buttons */}
      <nav className="flex space-x-4">
        <Link
          to="/home"
          className="bg-[#E2D2B8] text-white px-4 py-2 rounded-md hover:bg-[#AD9875] transition"
        >
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="bg-[#E2D2B8] text-white px-4 py-2 rounded-md hover:bg-[#AD9875] transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;