import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    destination: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date
    },
})

const post = mongoose.model("itenaries", postSchema)

export default post;