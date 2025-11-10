import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import appWriteService from "../../appwrite/config.service.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appWriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appWriteService.deleteFile(post.featuredImage);
      }
      const updatePostFile = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (updatePostFile) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = data.image[0]
        
    }
  };
  return <div>PostForm</div>;
}
