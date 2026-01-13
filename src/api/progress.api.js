import axios from "./axios";

export const completeLesson = async (courseId, lessonId) => {
  const res = await axios.post("/progress/complete-lesson", {
    courseId,
    lessonId,
  });
  return res.data.data;
};

export const getProgress = async (courseId) => {
  const res = await axios.get(`/progress/${courseId}`);
  return res.data.data;
};
