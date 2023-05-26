import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
  name: "exam",
  initialState: {
    id: null,
    languageKnowledgeQuestions: [],
    readingQuestions: [],
    listeningQuestions: [],
    answer: [],
  },
  reducers: {
    setExam: (state, action) => {
      state.id = action.payload.id;
      state.languageKnowledgeQuestions =
        action.payload.languageKnowledgeQuestions;
      state.readingQuestions = action.payload.readingQuestions;
      state.listeningQuestions = action.payload.listeningQuestions;
    },
    addAnswer: (state, action) => {
      state.answer = [...state.answer, ...action.payload];
    },
    resetAnswers: (state) => {
      state.answer = [];
    },
  },
});

export const { setExam, addAnswer, resetAnswers } = examSlice.actions;
export default examSlice.reducer;
