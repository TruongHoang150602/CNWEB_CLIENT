// slices/testSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET } from "utils/url";

export const getAllTestAPI = createAsyncThunk("test/getTests", async () => {
  try {
    const response = await GET({
      url: "/tests",
    });
    return response;
  } catch (error) {
    console.log("Failed to fetch test data from API");
  }
});

const testSlice = createSlice({
  name: "test",
  initialState: {
    testList: [],
    numberTest: null,
    isLoading: false,
    error: null,
    isSubmitted: false,
    isOpenModal: false,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    openModal(state, action) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTestAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTestAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testList = action.payload;
        state.numberTest = state.testList.length;
      })
      .addCase(getAllTestAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { openModal, closeModal } = testSlice.actions;

export const selectTestList = (state) => state.test.testList;
export const selectIsLoading = (state) => state.test.isLoading;
export const selectError = (state) => state.test.error;
export const selectIsOpenModal = (state) => state.test.isOpenModal;
export const selectIsSubmitted = (state) => state.test.isSubmitted;

export default testSlice.reducer;
