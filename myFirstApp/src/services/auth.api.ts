import axios from "axios";

const API_URL = "https://hrms-ask.onrender.com/api/auth/login";

export const loginApi = async (email: string, password: string) => {
  const response = await axios.post(API_URL, {
    email,
    password,
  });

  return response.data; // <-- backend response
};
