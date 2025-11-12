import { useEffect, useState } from "react";
import { Container, PostForm } from "../index.js";
import appWriteservice from "../../appwrite/config.service.js";
import { useNavigate, useParams } from "react-router-dom";

export function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appWriteservice.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
