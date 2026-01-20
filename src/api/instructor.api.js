import api from "./axios";

//* Get courses created by logged-in instructor

export const getInstructorCourses=async ()=>{
     const res=await api.get("/instructor/courses");
     return res.data.data;
};

//*Create a new course

export const createInstructorCourse = async({title , description})=>{
     const res = await api.post("/instructor/courses",
          {
               title,
               description,
          }
     );
     return res.data.data;
};

//* Add lesson

export const addLesson = async (formData)=>{
     const res=await api.post("/instructor/lessons",formData,{
          headers:{
               "Content-Type":"multipart/form-data",
          },
     });
     return res.data.data;
}

//* Delete lesson

export const deleteLesson = async (lessonId)=>{
     const res=await api.delete(`/instructor/lessons/${lessonId}`);
     return res.data.data;
}

//* View enrolled students

export const getCourseStudents= async(courseId)=>{
     const res=await api.get(`instructor/courses/${courseId}/students`);
     return res.data.data;
};

//* Restrict student

export const restrictStudent = async (courseId,studentId)=>{
     const res= await api.patch(
          `instructor/courses/${courseId}/students/${studentId}/restrict`
     );
     return res.data.data;
}

//* Unrestrict student

export const UnrestrictStudent = async (courseId,studentId)=>{
     const res=await api.patch(
          `instructor/courses/${courseId}/students/${studentId}/unrestrict`
     );
     return res.data.data;
};

//* Instructor progress dashboard

export const getCourseProgress = async (courseId)=>{
     const res = await api.get(`/instructor/courses/${courseId}/progress`);
     return res.data.data;
};


