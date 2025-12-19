import { FrontendWeatherData } from '@/types/location.types';
import axios from 'axios';
import * as Location from 'expo-location'; // <-- IMPORT EXPO-LOCATION
import { useEffect, useState } from "react";

// IMPORTANT: Replace with your actual backend IP address and port
const BASE_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`; // e.g., 'http://192.168.1.100:3000'


export const useLocation = () => {
     const [weatherData, setWeatherData] = useState<FrontendWeatherData | null>(null);
        const [loadingWeather, setLoadingWeather] = useState(false);
        const [errorWeather, setErrorWeather] = useState<string | null>(null);
    
        const getCurrentLocationAndWeather = async () => {
            setLoadingWeather(true);
            setErrorWeather(null);
            setWeatherData(null);
    
            // 1. Request Location Permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorWeather('Permission to access location was denied.');
                setLoadingWeather(false);
                return;
            }
    
            try {
                // 2. Get Current Location
                // Use high accuracy if needed, but beware of battery drain
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced, // Or Accuracy.High
                });
    
                const { latitude, longitude } = location.coords;
    
                // 3. Send Location to Backend to Get Weather
                const response = await axios.post<FrontendWeatherData>(`${BASE_URL}/weather`, {
                    latitude,
                    longitude,
                });
                setWeatherData(response.data);
    
            } catch (error: any) {
                setErrorWeather(error.response?.data?.error || `Failed to get current weather: ${error.message}`);
            } finally {
                setLoadingWeather(false);
            }
        };
    
        useEffect(() => {
            getCurrentLocationAndWeather();
        }, []);

        return {
            weatherData,
            loadingWeather,
            errorWeather,
            getCurrentLocationAndWeather,
        };
}