import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import sidebg from "../../assets/login-sideimg.jpeg";
import logo from "../../assets/logo2.png";
import { API } from "../../service/api";


export const Login = ({ isUserAuthenticated }) => {
  const [account, setAccount] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { setAccount: updateAccount } = useContext(DataContext);

  const toggleAccount = () => {
    setAccount(account === "login" ? "signup" : "login");
    setError("");
    setCredentials({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (account === "signup" && credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response =
        account === "signup"
          ? await API.userSignup({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            })
          : await API.userLogin({
              email: credentials.email,
              password: credentials.password,
            });

      if (response.isSuccess) {
        setError("");
        if (account === "login") {
          sessionStorage.setItem("accessToken", `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem("refreshToken", `Bearer ${response.data.refreshToken}`);
          updateAccount({ name: response.data.name, email: response.data.email });
          navigate("/home");
          isUserAuthenticated(true);
        } else {
          toggleAccount();
        }
      } else {
        setError("Authentication failed. Please check your details.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-[#e2d2b8]">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8 md:rounded-l-lg shadow-lg">
        <img src={logo} alt="Logo" className="w-60 mb-6" />
        <h1 className="text-2xl font-bold text-[#ad9875] mb-2">
          {account === "login" ? "Welcome Back" : "Get Started"}
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          {account === "login"
            ? "Enter your credentials to access your account."
            : "Enter your credentials to create an account."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          {account === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={credentials.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ad9875]"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ad9875]"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ad9875]"
            required
          />
          {account === "signup" && (
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ad9875]"
              required
            />
          )}
          <p
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-[#ad9875] cursor-pointer"
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ad9875] text-white py-2 rounded-md hover:bg-[#e2d2b8] transition"
          >
            {account === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          {account === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleAccount}
            className="text-[#ad9875] cursor-pointer hover:underline"
          >
            {account === "login" ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>

      {/* Right Background Section */}
      <div className="hidden md:block w-1/2">
        <img
          src={sidebg}
          alt="Background"
          className="w-full h-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  );
};
