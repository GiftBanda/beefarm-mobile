import { getSprayAdvice } from '@/services/spray.service';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface FrontendSprayingAdvice {
    location: string;
    date: string;
    status: 'Good' | 'Caution' | 'Unsuitable';
    reasons: string[];
    details: {
        temperature: number;
        feels_like: number;
        humidity: number;
        windSpeed: number;
        description: string;
        rainProbability: number;
        iconUrl: string; // <-- NEW
    };
}
export const useSpray = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [sprayingAdvice, setSprayingAdvice] = useState<FrontendSprayingAdvice | null>(null);
    const [loadingAdvice, setLoadingAdvice] = useState(false);
    const [errorAdvice, setErrorAdvice] = useState<string | null>(null);

    const [currentLat, setCurrentLat] = useState<number | null>(null);
    const [currentLon, setCurrentLon] = useState<number | null>(null);
    const [currentLocationName, setCurrentLocationName] = useState<string | null>(null);

    const handleGetAdvice = async () => {
        const isManualInput = location.trim() !== '';
        const isCurrentLocation = currentLat !== null && currentLon !== null;

        if (!date.trim()) {
            Alert.alert('Input Required', 'Please enter a date.');
            return;
        }

        if (!isManualInput && !isCurrentLocation) {
            Alert.alert('Location Required', 'Please enter a location or use your current location.');
            return;
        }
        if (isManualInput && isCurrentLocation) {
            setCurrentLat(null);
            setCurrentLon(null);
            setCurrentLocationName(null);
        }

        setLoadingAdvice(true);
        setErrorAdvice(null);
        setSprayingAdvice(null);

        try {
            let requestBody: { date: string; location?: string; latitude?: number; longitude?: number; };

            if (currentLat !== null && currentLon !== null) {
                requestBody = {
                    latitude: currentLat,
                    longitude: currentLon,
                    date: date,
                    location: currentLocationName || undefined
                };
            } else {
                requestBody = {
                    location: location.trim(),
                    date: date,
                };
            }

            const response = await getSprayAdvice(requestBody);
            setSprayingAdvice(response.data);
        } catch (error: any) {
            setErrorAdvice(error.response?.data?.error || `Failed to get spraying advice: ${error.message}`);
        } finally {
            setLoadingAdvice(false);
        }
    };

    const handleUseCurrentLocation = async () => {
        setLoadingAdvice(true);
        setErrorAdvice(null);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorAdvice('Permission to access location was denied.');
            setLoadingAdvice(false);
            return;
        }

        try {
            const locationResult = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const { latitude, longitude } = locationResult.coords;
            setCurrentLat(latitude);
            setCurrentLon(longitude);

            const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (geocode && geocode.length > 0) {
                const { city, country } = geocode[0];
                const displayName = city && country ? `${city}, ${country}` : 'Current Location';
                setCurrentLocationName(displayName);
                setLocation(displayName);
            } else {
                setCurrentLocationName('Current Location');
                setLocation('Current Location');
            }

        } catch (error: any) {
            setErrorAdvice(`Failed to get current location: ${error.message}`);
            setCurrentLat(null);
            setCurrentLon(null);
            setCurrentLocationName(null);
            setLocation('');
        } finally {
            setLoadingAdvice(false);
        }
    };

    useEffect(() => {
        handleUseCurrentLocation();
    }, []);

    return {
        handleGetAdvice,
        setDate,
        sprayingAdvice,
        loadingAdvice,
        errorAdvice,
        location,
        setLocation,
        handleUseCurrentLocation,
        currentLocationName,
        currentLat,
        currentLon,
        date,
        setCurrentLat,
        setCurrentLon,
        setCurrentLocationName
    };
};