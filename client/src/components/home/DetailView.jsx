import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../service/api";

const DetailView = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const url = post.picture ? post.picture : "https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg";

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="bg-[#E2D2B8] p-6 sm:p-8 md:p-12">
            <div className="max-w-screen-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <img
                    src={url}
                    alt="header"
                    className="w-full h-[50vh] object-cover rounded-lg"
                />
                <h2 className="text-3xl font-semibold text-center mt-6 mb-4 text-[#AD9875] break-words">
                    {post.title}
                </h2>
                <h3 className="text-xl text-center mb-4 text-[#E2D2B8]">
                    {post.destination}
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <p className="text-[#878787] text-center sm:text-left">
                        Author: {post.name}
                        {post.category}
                    </p>
                    <p className="text-[#878787] text-center sm:text-right">
                        {new Date(post.createdDate).toDateString()}
                    </p>
                </div>
                {/* Render description with preserved line breaks */}
                <div className="text-lg text-gray-700 mt-4 whitespace-pre-wrap">
                    {post.description}
                </div>
            </div>
        </div>
    );
};

export default DetailView;
