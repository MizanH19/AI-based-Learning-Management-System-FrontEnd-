import axios from "./axios";

/**
 * Generate quiz for a lesson using AI
 */
export const generateQuiz = async (lessonId) => {
  const res = await axios.post("/ai/generate-quiz", {
    lessonId,
  });
  return res.data.data;
};

/**
 * Submit quiz answers
 */
export const submitQuiz = async ({ courseId, lessonId, answers }) => {
  const res = await axios.post("/quiz/submit", {
    courseId,
    lessonId,
    answers,
  });
  return res.data.data;
};
