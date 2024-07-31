import { baseApi } from "./baseApi";

export const getAllPosts = async () => {
  const response = await baseApi.get("/coment");
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await baseApi.get(`/posts/${id}`);
  return response.data;
}

export const createComment = async (comment: { postId: number; message: string }) => {
  const response = await baseApi.post(`/comments`, comment);
  return response.data;
}

export const editComment = async (comment: { id: number; postId: number; message: string }) => {
  const response = await baseApi.put(`/comments`, comment);
  return response.data;
}

export const deleteComment = async (id: number) => {
  const response = await baseApi.delete(`/comments/${id}`);
  return response.data;
}

export const getCommentsByPostId = async (postId: number) => {
  const response = await baseApi.get(`/comments/post/${postId}`);
  return response.data;
}