import { useNavigate } from "react-router-dom";
import Landingimg from "../../assets/landing-img.jpg";
import image1 from "../../assets/login-bt.png";
import image2 from "../../assets/signup-bt.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-6 box-border grid grid-rows-4" style={{ backgroundColor: "#e2d2b8" }}>
      {/* Import Google Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Della+Respira&display=swap');`}
      </style>

      {/* First Row: Image */}
      <div className="row-span-2">
        <img
          src={Landingimg}
          alt="Landing"
          className="w-full h-full max-h-[40vh] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Second Row: Rotating Buttons */}
      <div className="row-span-1 flex justify-center items-center space-x-12">
        {/* Login Button */}
        <div
          onClick={() => navigate("/login")}
          className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:scale-110 transform transition-transform duration-300"
        >
          <img
            src={image1}
            alt="Login"
            className="w-full h-full object-cover animate-spin-slow"
          />
        </div>

        {/* Signup Button */}
        <div
          onClick={() => navigate("/signup")}
          className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:scale-110 transform transition-transform duration-300"
        >
          <img
            src={image2}
            alt="Signup"
            className="w-full h-full object-cover animate-spin-slow"
          />
        </div>
      </div>

      {/* Third Row: Heading */}
      <div className="row-span-1 flex flex-col justify-start items-center mt-4">
        <h1
          className="text-4xl tracking-wide"
          style={{
            fontFamily: '"Della Respira", serif',
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >T R A V O R A
        </h1>
        <p className="text-lg text-gray-600 mt-2 text-center">
          Plan your next adventure with Travora.
        </p>
      </div>
    </div>
  );
};

export default Landing;
