import axios from "./axios";

export const getCourseDetails = async (courseId) => {
  try {
     const res = await axios.get(`/student/courses/${courseId}`);
     console.log(res);
     
  return res.data.data;
  } catch (error) {
    console.error("Error in function");
    
  }
 
};

export const getAllCourses = async () => {
  const res = await axios.get("/student/courses");
  return res.data.data;
};

export const getMyCourses = async () => {
  const res = await axios.get("/student/my-courses");
  return res.data.data;
};

export const enrollInCourse = async (courseId) => {
  const res = await axios.post("/student/enroll", {
    courseId,
  });
  return res.data.data;
};
