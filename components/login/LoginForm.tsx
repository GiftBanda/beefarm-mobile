
import { useAuth } from '@/context/auth-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn, isLoading } = useAuth();
    const emailTrimmed = email.trim();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
    const isPasswordValid = password.length >= 6;
    const canSubmit = isEmailValid && isPasswordValid && !isLoading;
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
                        style={[styles.textInput, !isEmailValid && emailTrimmed.length > 0 && styles.inputError]}
                        placeholder="Email"
                        placeholderTextColor="#6B7280"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                    {!isEmailValid && emailTrimmed.length > 0 && (
                        <Text style={styles.errorText}>Enter a valid email address.</Text>
                    )}
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
                    {!isPasswordValid && password.length > 0 && (
                        <Text style={styles.errorText}>Password must be at least 6 characters.</Text>
                    )}
                    <Pressable
                        disabled={!canSubmit}
                        style={({ pressed }) => [
                            styles.submitButton,
                            !canSubmit && styles.submitButtonDisabled,
                            pressed && canSubmit && styles.submitButtonPressed,
                        ]}
                        onPress={() => {
                            signIn(emailTrimmed, password);
                        }}
                    >
                        <Text style={styles.submitButtonText}>
                            {
                                isLoading ? 'Signing In...' : 'Sign In'
                            }
                        </Text>
                    </Pressable>
                </View>

                <Link href="/signup" style={{ marginTop: 15, paddingVertical: 15 }}>
                    <Text style={{ textAlign: 'center' }}>Don&apos;t have an account? Sign up</Text>
                </Link>
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
    inner: {
    flex: 1,
    justifyContent: 'flex-end',  // important to keep TextInput at the bottom
    padding: 24,
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
        width: '100%',
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
        margin: 0
    },
    iconButtonText: {
        textAlign: 'center',
        marginLeft: -20,
    },
    inputError: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginBottom: 8,
        marginTop: -6,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    submitButtonPressed: {
        backgroundColor: '#1D4ED8',
    },
    submitButtonDisabled: {
        backgroundColor: '#93C5FD',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
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
});