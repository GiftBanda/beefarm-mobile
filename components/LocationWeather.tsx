import axios from 'axios';
import { Image } from 'expo-image';
import * as Location from 'expo-location'; // <-- IMPORT EXPO-LOCATION
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

// IMPORTANT: Replace with your actual backend IP address and port
const BASE_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`; // e.g., 'http://192.168.1.100:3000'

// --- WeatherData type (match backend) ---
interface FrontendWeatherData {
    location: string;
    temperature: number;
    feels_like: number;
    humidity: number;
    description: string;
    wind_speed: number;
    unit: 'Celsius' | 'Fahrenheit';
    iconUrl: string;
}

// --- Location Weather Component ---
export const LocationWeather = () => {
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

    return (
        <View style={styles.section}>
            {loadingWeather && <View><ActivityIndicator size="large" color="#015115" style={styles.loadingIndicator} />
            <Text style={styles.loadingText}>Fetching Weather...</Text>
            </View>}
            {errorWeather && <Text style={styles.errorText}>{errorWeather}</Text>}

            {weatherData && (
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{weatherData?.location}</Text>
                        <Text>{weatherData?.description}</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{weatherData?.temperature}°{weatherData.unit === 'Celsius' ? 'C' : 'F'}</Text>
                        <Text style={styles.weatherDetail}>Feels like: {weatherData.feels_like}°{weatherData.unit === 'Celsius' ? 'C' : 'F'}</Text>
                    </View>
                    <Image
                        source={{ uri: weatherData.iconUrl }} // Replace with actual weather icon URL
                        style={{ width: 150, height: 100 }}
                    />
                </View>
            )}

            {
                !loadingWeather && (<View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                }}><Pressable style={styles.link} onPress={() => navigate('/spray-advisor')}>
                <Text style={styles.linkText}>
                    Spray Advisor
                </Text>
            </Pressable>
            <Pressable onPress={getCurrentLocationAndWeather} style={styles.refresh}>
                <Text style={styles.refreshText}>
                   Refresh
                </Text>
            </Pressable>
            </View>)
            }

        </View>
    );
};

// --- Styles ---
const styles = StyleSheet.create({
    section: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
       // borderWidth: 1,
        borderColor: '#22c55e',
        borderRadius: 12,
    },
    loadingIndicator: {
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    weatherDetail: {
        fontSize: 16,
        //marginBottom: 3,
        color: '#333',
    },
    link: {
        //marginBottom: 20,
        marginLeft: 16,
        color: '#fff',
        backgroundColor: '#015115',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 30,
        textAlign: 'center',
        alignSelf: 'flex-start',
    },
    linkText: {
        fontSize: 16,
        fontWeight: 'medium',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    loadingText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    refresh: {
        //marginBottom: 20,
        marginLeft: 16,
        color: '#015115',
        backgroundColor: '#fff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#015115',
        textAlign: 'center',
    },
    refreshText: {
        fontSize: 16,
        fontWeight: 'medium',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});