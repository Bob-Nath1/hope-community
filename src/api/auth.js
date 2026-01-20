import API from "./axios";

export const signup = async (userData) => {
  const { data } = await API.post("/api/auth/signup", userData);
  return data;
};

export const login = async (data) => {
  const res = await API.post("/api/auth/login", data);
  return res.data;
};

export const getProfile = async () => {
  const { data } = await API.get("/api/user/profile");
  return data;
};
