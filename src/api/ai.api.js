import api from "./axios";
// export const askAI = async (question) => {
//   const res = await api.post("/ai/ask", {
//     question,
//   });
//   return res.data.data;
// };
export const askAI = async (courseId,lessonId,question) => {
  const res = await api.post("/ai/ask", {
    courseId,
    lessonId,
    question,
  });
  return res.data.data;
};
