import { createContext, useContext, useState } from "react";

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (courseId) => {
    setEnrolledCourses((prev) => {
      if (prev.includes(courseId)) return prev;
      return [...prev, courseId];
    });
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  return (
    <EnrollmentContext.Provider
      value={{ enrolledCourses, enrollCourse, isEnrolled }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => useContext(EnrollmentContext);
