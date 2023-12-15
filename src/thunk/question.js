import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewUserResultAPI, getUserResultAPI } from "pages/api/question";

export const getUserResult = createAsyncThunk(
  "userResult/getUserResult",
  async ({ userId, testId, type }, { rejectWithValue }) => {
    try {
      const response = await getUserResultAPI(userId, testId, type);

      if (!response) {
        const newResponse = await createNewUserResultAPI(userId, testId, type);
        return newResponse;
      }

      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const createNewUserResult = createAsyncThunk(
  "userResult/createUserResult",
  async ({ userId, testId, type }, { rejectWithValue }) => {
    try {
      const response = await createNewUserResultAPI(userId, testId, type);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
