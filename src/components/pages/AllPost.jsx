import AppWriteservice from "../../appwrite/config.service.js";
import { Container, PostCard } from "../index.js";
import { useEffect, useState } from "react";

export function AllPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    AppWriteservice.getAllPosts([])
      .then((posts) => {
        if (posts) {
          setPost(posts.rows);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
