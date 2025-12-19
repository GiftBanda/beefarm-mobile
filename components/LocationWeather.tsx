import { useLocation } from '@/hooks/useLocation';
import { Image } from 'expo-image';
import { navigate } from 'expo-router/build/global-state/routing';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';


// --- Location Weather Component ---
export const LocationWeather = () => {

    const { weatherData, loadingWeather, errorWeather, getCurrentLocationAndWeather } = useLocation();
   
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
                        source={{ uri: weatherData.iconUrl }}
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
        marginHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#22c55e',
        borderRadius: 12,
        backgroundColor: '#fff',
        padding: 16,
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
        color: '#333',
    },
    link: {
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