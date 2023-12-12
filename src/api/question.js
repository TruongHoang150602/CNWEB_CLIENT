// userResultAPI.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "utils/url";

export const getUserResultAPI = async (userId, testId, type) => {
  try {
    const response = await GET({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch user result data from API");
  }
};

export const createNewUserResultAPI = async (userId, testId, type) => {
  try {
    const response = await POST({
      url: `/userResults/${userId}/${testId}/${type}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch test data from API");
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
    throw new Error("Failed to update user result data");
  }
};
