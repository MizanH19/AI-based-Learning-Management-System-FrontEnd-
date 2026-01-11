import axios from "./axios";

export const getCourseDetails = async (courseId) => {
  const res = await axios.get(`/student/courses/${courseId}`);
  return res.data;
};


export const getAllCourses = async () => {
  const res = await axios.get("/student/courses");
  return res.data;
};

export const getMyCourses = async () => {
  const res = await axios.get("/student/my-courses");
  return res.data;
};

export const enrollInCourse = async (courseId) => {
  const res = await axios.post("/student/enroll", {
    courseId
  });
  return res.data;
};
