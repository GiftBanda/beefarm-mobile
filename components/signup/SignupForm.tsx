
import { useAuth } from '@/context/auth-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signUp, isLoading } = useAuth();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        placeholderTextColor="#6B7280"
                        keyboardType="default"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#6B7280"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={styles.passwordRow}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="#6B7280"
                            secureTextEntry={!showPassword}
                            keyboardType="default"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.iconButtonText}>
                                {showPassword ? (
                                    <FontAwesome name="eye" size={18} color="#14532D" />
                                ) : (
                                    <FontAwesome name="eye-slash" size={18} color="#14532D" />
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.submitButton,
                            pressed && styles.submitButtonPressed,
                        ]}
                        onPress={() => { 
                            if(!email || !password || !username) {
                                alert('Please fill all the fields')
                                return
                            }
                            signUp(email, password, username) 
                        }}
                    >
                        <Text style={styles.submitButtonText}>
                            {
                                isLoading ? 'Signing Up...' : 'Signup'
                            }
                        </Text>
                    </Pressable>
                    <Link href="/login" style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>Already have an account? Log in</Text>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    textInput: {
        height: 48,
        borderRadius: 10,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        paddingHorizontal: 14,
        backgroundColor: '#F9FAFB',
        color: '#111827',
        fontSize: 15,
        marginBottom: 12,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 10,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        backgroundColor: '#F9FAFB',
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 8,
        backgroundColor: 'transparent',
        color: '#111827',
        fontSize: 15,
    },
    iconButton: {
        height: 16,
        width: 16,
        borderRadius: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
    },
    iconButtonText: {
        textAlign: 'center',
        marginLeft: -20,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'stretch',
        padding: 20,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    submitButtonPressed: {
        backgroundColor: '#1D4ED8',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 16,
        paddingVertical: 10,
    },
    loginLinkText: {
        textAlign: 'center',
        color: '#14532D',
        fontSize: 14,
    },
});