import { crops } from '@/assets/data/crops';
import { BeeCropCard } from '@/components/BeeCropCard';
import { Header } from '@/components/Header';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Catalog = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView contentContainerStyle={{ padding: 0 }} showsVerticalScrollIndicator={false}>
            
                <View style={{ height: 240, marginTop: 10, marginBottom: 10, paddingHorizontal: 20, borderRadius: 20 }}>
                    <ImageBackground
                                    source={require('../assets/images/watermelon.jpg')}
                                    style={[styles.background, { borderRadius: 20, overflow: 'hidden' }]} // 👈 important
                                    imageStyle={{ borderRadius: 20 }} // 👈 apply to image itself
                                >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
                            style={styles.gradient}
                        >
                            <View style={styles.content}>
                                <Image source={require('../assets/images/farmlogo.png')} style={{ width: 100, height: 100 }} />
                                <Text style={styles.heading}>Order Fresh Produce</Text>
                                <Text style={styles.subheading}>We supply fresh produce to hotels, lodges,restaurants and supermarkets</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                <View style={{ gap: 10, borderRadius: 20 }}>
                {crops.map((item, index) => (
                    <BeeCropCard key={index} crop={item} />
                ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Catalog;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        marginTop: 10,
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
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
        marginTop: 20,
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