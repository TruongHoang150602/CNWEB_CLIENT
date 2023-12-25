// userResultAPI.js
import { GET, POST, PUT } from "utils/url";

export const getRecentPostsAPI = async (page) => {
  try {
    const response = await GET({
      url: `/social?page=${page}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch post data from API");
  }
};

export const getPostByUserIdAPI = async (userId) => {
  try {
    const response = await GET({
      url: `/social/user?id=${userId}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch post data from API");
  }
};

export const updatePostAPI = async (user) => {
  try {
    const response = await PUT({
      url: `/users/${user.id}`,
      params: user,
    });
    return response;
  } catch (error) {
    console.log("Failed to update user result data");
  }
};

export const createNewPostAPI = async (newPost) => {
  try {
    const response = await POST({
      url: `/social`,
      params: newPost,
    });
    return response;
  } catch (error) {
    console.log("Failed to update user result data");
  }
};

export const addCommentAPI = async (newComment) => {
  try {
    const response = await POST({
      url: `/social/comment`,
      params: newComment,
    });
    return response;
  } catch (error) {
    console.log("Failed to add comment");
  }
};
