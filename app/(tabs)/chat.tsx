import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// IMPORTANT: Replace with your actual backend IP address and port
// If running on an emulator/simulator, this MUST be your machine's local IP.
// If running on Expo Go in LAN mode, it might work with 'localhost' but best to use IP.
// --- Define backend endpoint ---
const BACKEND_API_URL = 'http://192.168.1.158:3001/api';

// --- Chat Component ---
const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [loadingChat, setLoadingChat] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setChatHistory(prev => [...prev, `You: ${userMessage}`]);
        setMessage('');
        setLoadingChat(true);

        try {
            const response = await axios.post(`${BACKEND_API_URL}/chat`, { message: userMessage });
            setChatHistory(prev => [...prev, `Gemini: ${response.data.response}`]);
        } catch (error: any) {
            console.error('Error sending message:', error.response?.data || error.message);
            Alert.alert('Error', `Failed to get response from Gemini: ${error.response?.data?.error || error.message}`);
            setChatHistory(prev => [...prev, `Error: Could not get response.`]);
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <SafeAreaView>
        <View style={styles.section}>
            <Text style={styles.title}>Gemini Chat</Text>
            <ScrollView style={styles.chatHistory}>
                {chatHistory.map((msg, index) => (
                    <Text key={index} style={msg.startsWith('You:') ? styles.userMessage : styles.geminiMessage}>
                        {msg}
                    </Text>
                ))}
                {loadingChat && <ActivityIndicator size="small" color="#0000ff" />}
            </ScrollView>
            <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
            />
            <Button title="Send to Gemini" onPress={handleSendMessage} disabled={loadingChat} />
        </View>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    section: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
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
        borderRadius: 5,
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
        padding: 10,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fefefe',
        maxHeight: 250, // Limit height for scrollability
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
});