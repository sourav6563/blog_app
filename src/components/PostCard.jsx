import AppwriteService from "../appwrite/config.service.js";
import { Link } from "react-router-dom";

export function PostCard({ $id, title, featuredImage }) {
  // Debug: log the featured image
  console.log("PostCard - Featured Image:", featuredImage);

  const imageUrl = featuredImage
    ? AppwriteService.getFileView(featuredImage)
    : null;
  console.log("PostCard - Image URL:", imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full-bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className="bg-gray-300 h-48 flex items-center justify-center rounded">
              <span className="text-gray-600">No image available</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold ">{title}</h2>
      </div>
    </Link>
  );
}
