import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
  name: "exam",
  initialState: {
    id: null,
    languageKnowledgeQuestions: [],
    readingQuestions: [],
    listeningQuestions: [],
    durationLanguageKnowledge: 0,
    durationReading: 0,
    durationListening: 0,
    answer: [],
  },
  reducers: {
    setExam: (state, action) => {
      state.id = action.payload.id;
      state.languageKnowledgeQuestions =
        action.payload.languageKnowledgeQuestions;
      state.readingQuestions = action.payload.readingQuestions;
      state.listeningQuestions = action.payload.listeningQuestions;
      state.durationLanguageKnowledge = action.payload.durationLanguageKnowledge;
      state.durationReading = action.payload.durationReading;
      state.durationListening = action.payload.durationListening;
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
