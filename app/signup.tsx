
import { SignupForm } from '@/components/signup/SignupForm';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signup = () => {
    
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
                    <Text style={styles.title}>AI Powered Farmers Guide</Text>
                    <Text style={styles.subtitle}>Please signup to continue</Text>
                    <SignupForm />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        //marginTop: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 20,
    },
    centerContent: {
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#667',
        textAlign: 'center',
    },
});