import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserResultAPI = createAsyncThunk(
  "userResult/getUserResult",
  async ({ userId, testId, type }, { rejectWithValue }) => {
    try {
      const response = await getUserResult(userId, testId, type);

      if (!response) {
        const newResponse = await createNewUserResult(userId, testId, type);
        return newResponse;
      }

      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

export const createNewUserResultAPI = createAsyncThunk(
  "userResult/createUserResult",
  async ({ userId, testId, type }, { rejectWithValue }) => {
    try {
      const response = await createNewUserResult(userId, testId, type);
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);
