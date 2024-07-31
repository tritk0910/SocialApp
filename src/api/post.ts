import { PostModel } from "@/model/post";
import { baseApi } from "./baseApi";

export const getAllPosts = async () => {
  const response = await baseApi.get("/posts");

  return response.data;
};

export const getPost = async (id: number) => {
  const response = await baseApi.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: PostModel) => {
  const response = await baseApi.post("/posts", post);
  return response.data;
};

export const updatePost = async (post: PostModel) => {
  const response = await baseApi.put(`/posts/`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await baseApi.delete(`/posts/${id}`);
  return response.data;
}