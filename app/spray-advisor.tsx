import { Header } from '@/components/Header';
import axios from 'axios';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// --- Define backend endpoint ---
const BACKEND_API_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`;

// Define a simplified type for the incoming spraying advice for the frontend
// --- Spraying Advice Component (Modified) ---
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

const SprayingAdviceScreen = () => {
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

            const response = await axios.post<FrontendSprayingAdvice>(`${BACKEND_API_URL}/spraying-advice`, requestBody);
            setSprayingAdvice(response.data);
        } catch (error: any) {
            console.error('Error getting spraying advice:', error.response?.data || error.message);
            setErrorAdvice(error.response?.data?.error || `Failed to get spraying advice: ${error.message}`);
        } finally {
            setLoadingAdvice(false);
        }
    };

    const handleUseCurrentLocation = async () => {
        setLoadingAdvice(true);
        setErrorAdvice(null);
        // setWeatherData(null); // No need to clear weather display here, it's a different component

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
            console.error('Error fetching current location:', error.message);
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

    return (
        <SafeAreaView>
            <Header title="Spraying Advisor" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    {
                        sprayingAdvice && (
                            <Image
                                source={{ uri: sprayingAdvice?.details.iconUrl || 'https://example.com/default-icon.png' }}
                                style={styles.image}
                            />
                        )
                    }
                    {
                        sprayingAdvice ? (
                            <View>
                                <Text style={styles.title}>{sprayingAdvice?.details.description}</Text>
                            </View>
                        ) : <Text style={styles.title}>Spraying Advisor</Text>
                    }


                    <TextInput
                        style={styles.input}
                        placeholder="Enter location (e.g., Lusaka) or use current"
                        value={currentLocationName || location}
                        onChangeText={text => {
                            setLocation(text);
                            setCurrentLocationName(null);
                            setCurrentLat(null);
                            setCurrentLon(null);
                        }}
                    />
                    {/* <Button
                title="Use Current Location"
                onPress={handleUseCurrentLocation}
                disabled={loadingAdvice}
                color={currentLat !== null ? "#28a745" : "#007bff"}
            /> */}
                    {/* {currentLat !== null && <Text style={styles.locationStatus}>Using: {currentLocationName || `Lat: ${currentLat.toFixed(4)}, Lon: ${currentLon!.toFixed(4)}`}</Text>} */}

                    <TextInput
                        style={styles.input}
                        placeholder="Enter date (YYYY-MM-DD or 'today', 'tomorrow')"
                        value={date}
                        onChangeText={setDate}
                    />

                    <Pressable style={styles.currentLocationButton} onPress={handleGetAdvice} disabled={loadingAdvice}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Get Advice</Text>
                    </Pressable>

                    {loadingAdvice && <View><ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} /></View>}
                    {errorAdvice && <Text style={styles.errorText}>{errorAdvice}</Text>}


                </View>
                {sprayingAdvice && (
                    <View style={styles.adviceContainer}>
                        <Text style={styles.adviceStatusText}>Status: {sprayingAdvice.status}</Text>
                        <Text style={styles.adviceDetailText}><Text style={{ fontWeight: 'bold' }}>Location</Text>: {sprayingAdvice.location}</Text>
                        <Text style={styles.adviceDetailText}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {sprayingAdvice.date}</Text>
                        <Text style={styles.adviceDetailText}><Text style={{ fontWeight: 'bold' }}>Reasons:</Text></Text>
                        {sprayingAdvice.reasons.map((reason, index) => (
                            <Text key={index} style={styles.adviceReasonText}>- {reason}</Text>
                        ))}
                    </View>
                )}

                <View style={{ height: 150 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SprayingAdviceScreen;

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    section: {
        //width: '100%',
        backgroundColor: '#fff',

        borderRadius: 10,
        padding: 20,
        //marginHorizontal: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#555',
        textAlign: 'center',
    },
    chatHistory: {
        height: 200,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eef',
    },
    userMessage: {
        textAlign: 'right',
        color: '#007bff',
        marginBottom: 5,
    },
    geminiMessage: {
        textAlign: 'left',
        color: '#28a745',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 30,
    },
    adviceContainer: {
        marginTop: 15,
        padding: 16,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fefefe',
        //maxHeight: 550, // Limit height for scrollability
    },
    adviceStatusText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    adviceDetailText: {
        fontSize: 16,
        marginBottom: 3,
        color: '#333',
    },
    adviceReasonText: {
        fontSize: 14,
        marginLeft: 10,
        color: '#666',
    },
    adviceSubDetailText: {
        fontSize: 14,
        marginLeft: 10,
        color: '#666',
    },
    loadingIndicator: {
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    locationStatus: {
        fontSize: 14,
        color: '#666',
        marginTop: -5, // Adjust spacing
        marginBottom: 10,
        textAlign: 'center',
    },
    weatherDetailsRow: { // NEW style for aligning text and icon
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Pushes icon to the right
        marginBottom: 3,
    },
    weatherIcon: { // NEW style for the image
        width: 50, // Adjust size as needed
        height: 50,
        marginLeft: 10, // Spacing from text
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    currentLocationButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        backgroundColor: '#015115',
        marginBottom: 10,
    },
});