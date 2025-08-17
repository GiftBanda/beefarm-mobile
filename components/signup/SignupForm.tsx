
import { useAuth } from '@/context/auth-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={{ flex: 1, width: '100%', padding: 10, }}>
                    <TextInput
                        style={{ height: 40, borderRadius: 5, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                        placeholder="Username"
                        keyboardType='default' // Example of keyboard type
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={{ height: 40, borderRadius: 5, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                        placeholder="Email"
                        keyboardType='email-address' // Example of keyboard type
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={{ flexDirection: 'row', }}>
                        <TextInput
                            style={{ height: 40, width: '90%', borderRadius: 5, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                            placeholder="Enter more text"
                            secureTextEntry={showPassword} // Example of secure text entry
                            keyboardType='default' // Example of keyboard type
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: '#eee', padding: 10, borderRadius: 5, }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>{showPassword ? <FontAwesome name="eye" size={18} color="#14532D" /> : <FontAwesome name="eye-slash" size={18} color="#14532D" />}</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#ddd' : '#2196F3',
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                                borderRadius: 10,
                            },
                        ]}
                        onPress={() => { 
                            if(!email || !password || !username) {
                                alert('Please fill all the fields')
                                return
                            }
                            signUp(email, password, username) 
                        }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Signup</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'flex-end',  // important to keep TextInput at the bottom
        padding: 24,
    },
    textInput: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});