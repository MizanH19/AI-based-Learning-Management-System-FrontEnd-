import api from "./axios";

/**
 * LOGIN USER
 * POST /api/auth/login
 */
export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

/**
 * REGISTER STUDENT
 * POST /api/auth/register
 */
export const register = async ({ name, email, password }) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return res.data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    throw new Error(message);
  }
};
