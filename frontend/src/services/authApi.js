import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("http://127.0.0.1:8000/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post("http://127.0.0.1:8000/auth/register", userData);
  return res.data;
};

