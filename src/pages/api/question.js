// userResultAPI.js
import { GET, POST, PUT } from "utils/url";

export const getUserResultAPI = async (userId, testId, type) => {
  try {
    const response = await GET({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch user result data from API");
  }
};

export const createNewUserResultAPI = async (userId, testId, type) => {
  try {
    const response = await POST({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch test data from API");
  }
};

export const updateUserResultAPI = async (
  userResultId,
  answers,
  isSubmitted,
  score
) => {
  try {
    const response = await PUT({
      url: `/userResults/${userResultId}`,
      params: { answers, isSubmitted, score },
    });
    return response;
  } catch (error) {
    console.log("Failed to update user result data");
  }
};
