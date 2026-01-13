import api from "./axios";

/**
 * Create a new course
 * POST /api/admin/courses
 */
export const createCourse = async (data) => {
  const res = await api.post("/admin/courses", data);
  return res.data.data;
};

/**
 * Get all courses (admin view)
 * GET /api/admin/courses
 */
export const getAdminCourses = async () => {
  const res = await api.get("/admin/courses");
  return res.data.data;
};

/**
 * Add lesson to a course (video/pdf)
 * POST /api/admin/lessons
 */
export const addLesson = async (formData) => {
  const res = await api.post("/admin/lessons", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

/**
 * Delete lesson safely
 * DELETE /api/admin/lessons/:lessonId
 */
export const deleteLesson = async (lessonId) => {
  const res = await api.delete(`/admin/lessons/${lessonId}`);
  return res.data.data.lessonId;
};

/**
 * Get all users (admin)
 * GET /api/admin/users
 */
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.data;
};
