
import { LoginForm } from '@/components/login/LoginForm';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('@/assets/images/farmlogo.png')}
                    style={styles.image}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
                    Welcome Back!
                </Text>
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
                    Please login to continue
                </Text>
                <LoginForm />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
});