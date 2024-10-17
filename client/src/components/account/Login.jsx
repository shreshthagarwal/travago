import { useContext, useState } from "react"
import React from 'react'
import { Box,TextField,Button,styled, Typography } from '@mui/material';

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
width:400px; 
margin:auto;
background-color: beige;
border-radius: 30px;`

const Image = styled("img")({
  width:300,
  margin:"auto",
  display:"flex",
  padding:20
})

const Wrapper = styled(Box)`
padding:20px;
display:flex;
flex:1;
flex-direction:column;
& > div, & > button, & > p {
margin: 10px 0px;
}
`

const Error = styled(Typography)`
  font-size: 10px;
  margin-top: 10px;
`;


const signupInitianValues = {
  name:"",
  email:"",
  password: ""

}

const loginInitialValues = {
  email:"",
  password:""
}

export const Login = () => {

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitianValues)
  const [login,setLogin] = useState(loginInitialValues)
  const [error,setError] = useState("");
  const {setAccount} = useContext(DataContext);

  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup")
  }

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value})
  }

  const onValueChange = (e) => {
    setLogin({...login,[e.target.name]:e.target.value})
  }

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess){
        setError("");
        setSignup(signupInitianValues);
        toggleAccount("login");
      } else {
        setError("Error!")
      }
    } catch (error) {
      console.error("Sign-up failed", error); 
    }
  }

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) { 
        console.log(response)
        setError("");
        sessionStorage.setItem("accessToken",`Bearer ${response.data.accessToken}`)
        sessionStorage.setItem("refreshToken",`Bearer ${response.data.refreshToken}`)
        setAccount({name:response.data.name ,email:response.data.email})
        console.log("Tokens set, navigating to /home");
        navigate("/home");
      } else {
        setError("Login failed. Please check your credentials."); // Display a more meaningful error
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Something went wrong. Please try again.");
    }
  }
  
  

  return (
    <Component component="section" sx={{ p: 2 }}>
      { account === "login" ?<>
      <Image src={"https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png"} alt="" />
      <Wrapper>
      <TextField id="outlined-basic" value={login.email} onChange={(e)=>onValueChange(e)} label="Email" name="email" variant="outlined" />
      <TextField id="outlined-basic" value={login.password} onChange={(e)=>onValueChange(e)} label="Password" name="password" variant="outlined" />
      <Button onClick={()=>loginUser()} variant="contained">Login</Button>
      <Typography style={{ textAlign:"center"}}>
  Dont have an account?
</Typography>
      <Button onClick={()=>toggleSignup()} variant="outlined">Create an account</Button>
      </Wrapper> </>:<>
      <Wrapper>
              <Image src={"https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png"} alt="" />

      <TextField id="outlined-basic" onChange={(e)=>onInputChange(e)} label="Name" name="name" variant="outlined" />
      <TextField id="outlined-basic" onChange={(e)=>onInputChange(e)} label="Email" name="email" variant="outlined" />
      <TextField id="outlined-basic" onChange={(e)=>onInputChange(e)} label="Password" name="password" variant="outlined" />
        {error && <Error>{error}</Error>}
      <Button onClick={()=>signupUser()} variant="contained">Sign Up</Button>
      <Typography style={{ textAlign:"center"}}>
  Already have an account?
</Typography>
      <Button onClick={()=>toggleSignup()} variant="outlined">Sign In</Button>
      </Wrapper>
      </>
}
    </Component>
  )
}
