import bcrypt from "bcrypt"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../models/token.js"

dotenv.config()

export const signupUser= async (request,response)=>{
    try {
        //const salt  = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(request.body.password,10)
        const user = {name:request.body.name, email:request.body.email, password:hashedPassword}
        const newUser = new User(user);
        await newUser.save()

        return response.status(200).json({msg: "Signup successful"})
    } catch (error) {
        return response.status(500).json({msg:"Error while signing up user"})

    }
}

export const loginUser = async (request, response) => {
  try {
    console.log('Login request:', request.body); 
    
    let user = await User.findOne({ email: request.body.email });
    
    if (!user) {
      console.log('User not found'); 
      return response.status(400).json({ msg: "Could not find user" });
    }

    let match = await bcrypt.compare(request.body.password, user.password);
    console.log('Password match:', match); 
    
    if (match) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "120m" });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
      
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      
      return response.status(200).json({ accessToken, refreshToken, name: user.name, email: user.email });
    } else {
      console.log('Password does not match'); 
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    console.error('Error during login:', error); 
    return response.status(500).json({ msg: "Error while logging in user" });
  }
};
