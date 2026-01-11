import axios from "./axios";

export const initProgress = async (courseId) => {
  const res = await axios.post("/progress/init", { courseId });
  return res.data;
};

export const completeLesson = async (courseId, lessonId) => {
  const res = await axios.post("/progress/complete-lesson", {
    courseId,
    lessonId
  });
  return res.data;
};

export const getProgress = async (courseId) => {
  const res = await axios.get(`/progress/${courseId}`);
  return res.data;
};
