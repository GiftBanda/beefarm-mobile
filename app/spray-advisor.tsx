import { Header } from '@/components/Header';
import { useSpray } from '@/hooks/spray/useSpray';
import { Image } from 'expo-image';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SprayingAdviceScreen = () => {

    const { sprayingAdvice, loadingAdvice, errorAdvice, handleGetAdvice, location, setLocation, setDate, currentLocationName, setCurrentLocationName, setCurrentLat, setCurrentLon, date } = useSpray();

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
    container: {
        flexGrow: 1,
        padding: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#555',
        textAlign: 'center',
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
    adviceContainer: {
        marginTop: 15,
        padding: 16,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fefefe',
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