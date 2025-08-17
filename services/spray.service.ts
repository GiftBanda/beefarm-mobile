import axiosInstance from "@/config/axiosInstance";
import { FrontendSprayingAdvice } from "@/types/spray.types";

export const getSprayAdvice = (requestBody: { date: string; location?: string; latitude?: number; longitude?: number; }) => {
    return axiosInstance.post<FrontendSprayingAdvice>(`/spraying-advice`, requestBody)
}