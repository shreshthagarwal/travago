import Post from "../models/post.js"

export const createItenary = async (request,response) => {
    try {
        const post  = await new Post(request.body);
        post.save()
        return response.status(200).json("Post saved successfully!");
    } catch (error) {
        return response.status(500).json(error);
    }
}