import axiosInstance from "./axiosInstance";
import type { RegisterPayload,LoginPayload } from "@/reduxStore/features/auth/types";

export const login = async ({email, password} : LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", {
        email,
        password,
    });
    return response.data;
};

export const register = async ({name, email,address, password,profilePic} : RegisterPayload) => {
    const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        address,
        password,
        profilePic,
    });
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

export const getUser = async () => {
    const response = await axiosInstance.get("/auth/user");
    return response.data;
};