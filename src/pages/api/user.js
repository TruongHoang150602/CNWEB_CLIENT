// userResultAPI.js
import { GET, POST, PUT } from "utils/url";

export const getUserByIdAPI = async (userId) => {
  try {
    const response = await GET({
      baseURL: "https://653b1ca02e42fd0d54d4b3b0.mockapi.io",
      url: `/users/${userId}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user data from API");
  }
};

export const getAllUsersAPI = async () => {
  try {
    const response = await GET({
      baseURL: "https://653b1ca02e42fd0d54d4b3b0.mockapi.io",
      url: `/users`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch test data from API");
  }
};

export const updateUserDataAPI = async (user) => {
  try {
    const response = await PUT({
      baseURL: "https://653b1ca02e42fd0d54d4b3b0.mockapi.io",
      url: `/users/${user.id}`,
      params: user,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to update user result data");
  }
};

export const createNewUserAPI = async (userId, name) => {
  try {
    const response = await POST({
      baseURL: "https://653b1ca02e42fd0d54d4b3b0.mockapi.io",
      url: `/users`,
      params: { userId, name },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to update user result data");
  }
};
