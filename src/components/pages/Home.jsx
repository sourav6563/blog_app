import { useState, useEffect } from "react";
import appWriteservice from "../../appwrite/config.service.js";
import { Container, PostCard } from "../index.js";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appWriteservice
      .getAllPosts([])
      .then((posts) => {
        if (posts) {
          console.log("Fetched posts:", posts.rows);
          setPosts(posts.rows);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  if (posts.length <= 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap ">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                login to read post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
