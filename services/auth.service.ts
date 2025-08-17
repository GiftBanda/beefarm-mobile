import axiosInstance from "@/config/axiosInstance";

export const fetchUserFromToken = (token: string) => {
    // TODO: fetch user from token
    return axiosInstance.get(`/auth/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
}

export const login = (email: string, password: string) => {
    return axiosInstance.post(`/auth/login`, {
        email: email.toLowerCase(),
        password
    })
}

export const register = (email: string, password: string, name: string) => {
    return axiosInstance.post(`/auth/signup`, {
        email,
        password,
        name
    })
}