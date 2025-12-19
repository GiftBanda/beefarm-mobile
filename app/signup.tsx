
import { SignupForm } from '@/components/signup/SignupForm';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
    
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, height: '100%'  }}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.image}
                />
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>
                    Join The Best Farmers Community
                </Text>
                <Text style={{ fontSize: 16, color: '#667', marginBottom: 10 }}>
                    Please signup to continue
                </Text>
                <SignupForm />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginTop: 100,
    },
});