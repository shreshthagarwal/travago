import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import sidebg from "../../assets/LogandSignbg.jpg";
import log from "../../assets/Logo2.png";

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  background-color: beige;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 400px;
  padding: 2rem;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }
`;

const Image = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "4% 0 0 4%",
});

const Logo = styled("img")({
  width: 120,
  marginBottom: "1rem",
});

const Title = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f4a261;
  margin-bottom: 0.5rem;
`;

const ErrorText = styled(Typography)`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

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
      const response = account === "signup"
        ? await API.userSignup({ name: credentials.name, email: credentials.email, password: credentials.password })
        : await API.userLogin({ email: credentials.email, password: credentials.password });

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
    <Container>
      <FormContainer>
        <Logo src={log} alt="Logo" />
        <Title>{account === "login" ? "Welcome Back" : "Get Started"}</Title>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {account === "login"
            ? "Enter your credentials to access your account."
            : "Enter your credentials to create an account."}
        </Typography>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {account === "signup" && (
            <TextField
              label="Full Name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
          )}
          <TextField
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
          {account === "signup" && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              required
              fullWidth
              margin="normal"
            />
          )}
          <Typography
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", color: "#f4a261" }}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </Typography>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#f4a261" }} fullWidth>
            {account === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        
        <Typography variant="body2" align="center" marginTop={2}>
          {account === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to="#" onClick={toggleAccount} style={{ color: "#f4a261" }}>
            {account === "login" ? "Sign Up" : "Log In"}
          </Link>
        </Typography>
      </FormContainer>
      
      <Box sx={{ display: { xs: "none", md: "block" }, width: "50%" }}>
        <Image src={sidebg} alt="Background" />
      </Box>
    </Container>
  );
};
