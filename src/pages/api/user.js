// userResultAPI.js
import { GET, POST, PUT } from "utils/url";

export const getUserByIdAPI = async (userId) => {
  try {
    const response = await GET({
      url: `/users/userById/${userId}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch test data from API");
  }
};

export const getFullUserInfoIdAPI = async (userId) => {
  try {
    const response = await GET({
      url: `/users/fullUserInfo/${userId}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch user data from API");
  }
};

export const getAllUsersAPI = async (query) => {
  try {
    const response = await POST({
      url: `/users/userByQuery`,
      params: query,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch test data from API");
  }
};

export const updateUserDataAPI = async (user) => {
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

export const createNewUserAPI = async (userId, name) => {
  try {
    const response = await POST({
      url: `/users`,
      params: { userId, name },
    });
    return response;
  } catch (error) {
    console.log("Failed to update user result data");
  }
};
