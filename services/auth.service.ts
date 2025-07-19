import api from "@/config/axiosInstance"

export const fetchUserFromToken = (token: string) => {
    // TODO: fetch user from token
    return api.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const login = (email: string, password: string) => {
    return api.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/login`, {
        email,
        password
    })
}

export const register = (email: string, password: string, name: string) => {
    return api.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        email,
        password,
        name
    })
}