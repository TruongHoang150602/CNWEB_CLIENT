// slices/questionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createNewUserResult, getUserResult } from "thunk/question";
import {
  checkSufficientQuestions,
  chooseOptionFuntion,
  resetUserAnswer,
  submitUserAnswer,
} from "utils/question";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    userAnswer: [],
    currentQuestion: null,
    numberQuestion: 0,
    type: "practice",
    score: 0,
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

    startGame(state) {
      state.currentQuestion = 0;
    },

    restartGame(state, action) {
      state.currentQuestion = 0;
      resetUserAnswer(state.userAnswer);
    },

    calculateScore(state) {
      state.score++;
    },

    chooseOption(state, action) {
      const optionId = action.payload;
      const currentQuestion = state.userAnswer[state.currentQuestion];

      switch (currentQuestion.question.question_type) {
        case "choice":
          currentQuestion.options = chooseOptionFuntion(
            currentQuestion.options,
            optionId
          );
          if (state.type === "practice") {
            currentQuestion.showAnswer = true;
          }
          break;
        case "multiple_choice":
          currentQuestion.options = chooseOptionFuntion(
            currentQuestion.options,
            optionId,
            true
          );
          if (state.type === "practice") {
            currentQuestion.showAnswer = checkSufficientQuestions(
              currentQuestion.options
            );
          }
          break;
        case "multiple_answer":
          currentQuestion.options = chooseOptionFuntion(
            currentQuestion.options,
            optionId,
            true
          );
          break;
        default:
          break;
      }

      console.log(currentQuestion.options);
    },

    chooseQuestion(state, action) {
      state.currentQuestion = action.payload;
    },

    changeTab(state, action) {
      const { userId, testId, type } = action.payload;
      state.type = type;
      getUserResult({ userId, testId, type });
    },

    submit(state, action) {
      state.isSubmitted = true;
      state.isOpenModal = false;
      state.currentQuestion = null;
      submitUserAnswer(state.userAnswer);
    },

    submitQuestion(state, action) {
      const currentQuestion = state.userAnswer[state.currentQuestion];
      if (currentQuestion.question.question_type == "input") {
        const answer = action.payload;
        console.log(answer);
        state.userAnswer[state.currentQuestion].answer = answer.answer;
      }
      if (state.type == "practice")
        state.userAnswer[state.currentQuestion].showAnswer = true;
    },

    openModal(state, action) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
      state.currentQuestion = null;
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserResult.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
        state.currentQuestion = null;
        state.isSubmitted = false;
      })
      .addCase(getUserResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createNewUserResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewUserResult.fulfilled, (state, action) => {
        state.isLoading = false;
        const userResult = action.payload;
        state.userAnswer = userResult.answers;
        state.numberQuestion = state.userAnswer.length;
        state.currentQuestion = null;
        state.isSubmitted = false;
      })
      .addCase(createNewUserResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  openModal,
  closeModal,
  changeTab,
  chooseQuestion,
  calculateScore,
  startGame,
  submit,
  submitQuestion,
  chooseOption,
} = questionSlice.actions;

export const selectCurrentQuestion = (state) => state.question.currentQuestion;
export const selectNumberQuestion = (state) => state.question.numberQuestion;
export const selectUserAnswer = (state) => state.question.userAnswer;
export const selectScore = (state) => state.question.score;
export const selectIsLoading = (state) => state.question.isLoading;
export const selectError = (state) => state.question.error;
export const selectIsOpenModal = (state) => state.question.isOpenModal;
export const selectIsSubmitted = (state) => state.question.isSubmitted;
export const selectType = (state) => state.question.type;

export default questionSlice.reducer;
