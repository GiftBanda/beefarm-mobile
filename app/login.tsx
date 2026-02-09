
import { LoginForm } from '@/components/login/LoginForm';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.centerContent}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Please login to continue</Text>
                    <LoginForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    centerContent: {
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        //marginTop: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#667',
        textAlign: 'center',
    },
});