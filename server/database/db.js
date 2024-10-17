import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const URL = process.env.URL

const Connection = async () => {
    try {
        await mongoose.connect(URL)
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Error!",error)
    }
}

export default Connection;