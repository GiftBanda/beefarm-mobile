import { Image, } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string;
    description: string;
    image: ImageSourcePropType;
    btnText: string;
    link: '/catalog' | '/treatplant';
}

export const GradientCard = ({ title, description, image, btnText, link }: Props) => {
    return (
        <View style={{ height: 260, marginBottom: 10, paddingHorizontal: 20 }}>
            <ImageBackground
                source={image}
                style={[styles.background, { borderRadius: 20, overflow: 'hidden' }]} // 👈 important
                imageStyle={{ borderRadius: 20 }} // 👈 apply to image itself
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ width: 160, height: 100 }}
                        />
                        <Text style={styles.heading}>{title}</Text>
                        <Text style={styles.subheading}>{description}</Text>
                        <Link href={link} style={styles.button}>
                            <Text style={styles.buttonText}>{btnText}</Text>
                        </Link>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#547A64',
        borderRadius: 20,
        objectFit: 'contain',
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        objectFit: 'contain',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
    },
    heading: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subheading: {
        marginTop: 4,
        fontSize: 14,
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});