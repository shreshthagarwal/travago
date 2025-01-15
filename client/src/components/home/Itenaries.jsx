import { useState, useEffect } from "react";
import { API } from "../../service/api";
import { useSearchParams, Link } from "react-router-dom";

const Itenaries = () => {
  const [itenary, setItenary] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

useEffect(() => {
  const fetchData = async () => {
    let response = await API.getItenaries({ category: category || "" });
    if (response.isSuccess) {
      console.log(response.data); // Debug: Check what the API returns
      setItenary(response.data);
    }
  };
  fetchData();
}, [category]);

  return (
    <div className="bg-[#E2D2B8] p-6 rounded-lg">
      {itenary && itenary.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itenary.map((post) => (
            <Link
              key={post._id}
              to={`/home/details/${post._id}`}
              className="text-inherit no-underline"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow flex flex-col items-center h-full">
                {/* Title */}
                <h2
                  className="text-xl font-bold text-[#AD9875] mb-2 text-center break-words"
                >
                  {post.title}
                </h2>

                {/* Destination */}
                <h3 className="text-md text-[#E2D2B8] mb-1 text-center uppercase">
                  {post.destination}
                </h3>

                {/* Author */}
                <p className="text-sm text-gray-500 mb-4 text-center">
                  {post.name} <br />
                  {post.categories}
                </p>

                {/* Image */}
                <div className="mb-4">
                  <img
                    src={post.picture}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-700 text-center line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6 text-gray-700 text-lg">
          No Itineraries posted yet!!
        </div>
      )}
    </div>
  );
};

export default Itenaries;
