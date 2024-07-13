import { LoginType } from "@/lib/types";
import { API_URL } from "@/lib/constans";
import axiosInstance from "@/lib/axiosInstance";

export const login = async ({ username, password }: LoginType) => {
  try {
    const { data } = await axiosInstance.post(`${API_URL}/login`, {
      username,
      password,
    });

    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    alert("Invalid Credentials");
    return;
  }
};

export const currentUser = async () => {
  try {
    const data = axiosInstance.get(`${API_URL}/me`);

    return data;
  } catch (error) {
    console.log("Error");
  }
};
