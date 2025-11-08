import AppwriteService from "../appwrite/config.service.js";
import { Link } from "react-router-dom";

export function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full-bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          <img
            src={AppwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2 className="text-xl font-bold ">{title}</h2>
      </div>
    </Link>
  );
}
