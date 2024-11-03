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

export const getItenaries = async (request,response) => {
    let category = request.query.category;
    let itenary;
    try {
        if (category) {
            itenary = await Post.find({ categories: category})
        } else {
            itenary = await Post.find({})

        }
        return response.status(200).json(itenary);
    } catch(error) {
        return response.status(500).json({msg:error.message})
    }
}

export const getPost = async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post)
    } catch (error) {
        response.status(500).json({msg: error.message})
    }
}