import axios from "axios";

const BASE_URL = "http://192.168.2.196:5000/api"; // ✅: 192.168.2.196

export const loginApi = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};
