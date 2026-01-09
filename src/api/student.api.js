import axios from "./axios";

export const getCourseDetails = async (courseId) => {
  const res = await axios.get(`/student/courses/${courseId}`);
  return res.data;
};


export const getAllCourses = async () => {
  return [
    {
      _id: "201",
      title: "Node.js Backend Development",
      description: "Learn backend APIs with Node.js and Express",
      duration: "8 weeks"
    }
  ];
};
