import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// IMPORTANT: Replace with your actual backend IP address and port
const BACKEND_API_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`;

// Types for better type safety
interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'gemini';
    timestamp: Date;
}

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loadingChat, setLoadingChat] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [chatHistory]);

    // Fade in animation for new messages
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const generateMessageId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    const handleSendMessage = async () => {

        const userMessage: ChatMessage = {
            id: generateMessageId(),
            text: message.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');
        setLoadingChat(true);

        try {
            const response = await axios.post(`${BACKEND_API_URL}/v1/chat`, { 
                message: userMessage.text 
            });

            console.log('Gemini response:', response.data);
            
            const geminiMessage: ChatMessage = {
                id: generateMessageId(),
                text: response.data.response,
                sender: 'gemini',
                timestamp: new Date(),
            };
            
            setChatHistory(prev => [...prev, geminiMessage]);
        } catch (error: any) {
            console.error('Error sending message:', error.response?.data || error.message);
            
            const errorMessage: ChatMessage = {
                id: generateMessageId(),
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'gemini',
                timestamp: new Date(),
            };
            
            setChatHistory(prev => [...prev, errorMessage]);
            Alert.alert('Error', `Failed to get response: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoadingChat(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const clearChat = () => {
        Alert.alert(
            'Clear Chat',
            'Are you sure you want to clear all messages?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => setChatHistory([]) }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Ionicons name="chatbubble-ellipses" size={24} color="#007510ff" />
                        <Text style={styles.headerTitle}>Agronova Chat</Text>
                    </View>
                    {chatHistory.length > 0 && (
                        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
                            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Chat Messages */}
                <Animated.View style={[styles.chatContainer, { opacity: fadeAnim }]}>
                    {chatHistory.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="chatbubbles-outline" size={64} color="#CCCCCC" />
                            <Text style={styles.emptyStateTitle}>Start a conversation</Text>
                            <Text style={styles.emptyStateText}>
                                Send a message to begin chatting with Agronova AI
                            </Text>
                        </View>
                    ) : (
                        <ScrollView 
                            ref={scrollViewRef}
                            style={styles.chatHistory}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.chatContent}
                        >
                            {chatHistory.map((msg) => (
                                <View 
                                    key={msg.id} 
                                    style={[
                                        styles.messageBubble,
                                        msg.sender === 'user' ? styles.userBubble : styles.geminiBubble
                                    ]}
                                >
                                    <Text style={[
                                        styles.messageText,
                                        msg.sender === 'user' ? styles.userText : styles.geminiText
                                    ]}>
                                        {msg.text}
                                    </Text>
                                    <Text style={[
                                        styles.timestamp,
                                        msg.sender === 'user' ? styles.userTimestamp : styles.geminiTimestamp
                                    ]}>
                                        {formatTime(msg.timestamp)}
                                    </Text>
                                </View>
                            ))}
                            {loadingChat && (
                                <View style={[styles.messageBubble, styles.geminiBubble]}>
                                    <View style={styles.typingIndicator}>
                                        <ActivityIndicator size="small" color="#666" />
                                        <Text style={styles.typingText}>Agronova is typing...</Text>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    )}
                </Animated.View>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your message..."
                            value={message}
                            onChangeText={setMessage}
                            onSubmitEditing={handleSendMessage}
                            returnKeyType="send"
                            multiline
                            maxLength={1000}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity 
                            style={[
                                styles.sendButton,
                                (!message.trim() || loadingChat) && styles.sendButtonDisabled
                            ]}
                            onPress={handleSendMessage}
                            disabled={!message.trim() || loadingChat}
                        >
                            <Ionicons 
                                name="send" 
                                size={20} 
                                color={!message.trim() || loadingChat ? "#CCC" : "#FFF"} 
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.charCount}>
                        {message.length}/1000
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    clearButton: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: '#FFF0F0',
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8E8E93',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#C7C7CC',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    chatHistory: {
        flex: 1,
    },
    chatContent: {
        paddingBottom: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 4,
    },
    geminiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: '#FFFFFF',
    },
    geminiText: {
        color: '#1C1C1E',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
        opacity: 0.7,
    },
    userTimestamp: {
        color: '#E3F2FD',
        textAlign: 'right',
    },
    geminiTimestamp: {
        color: '#8E8E93',
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    typingText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#F8F9FA',
        maxHeight: 100,
        textAlignVertical: 'center',
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#007510ff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#F0F0F0',
    },
    charCount: {
        fontSize: 12,
        color: '#C7C7CC',
        textAlign: 'right',
        marginTop: 4,
    },
});