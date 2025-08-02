import { BeeCropCard } from '@/components/BeeCropCard';
import { Header } from '@/components/Header';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Catalog = () => {
    const crops = [
        {
            title: "Tomato",
            weight: "50kg",
            market: "BeeFarms",
            price: "250",
            url: require("@/assets/images/tomatoes.jpg")
        },
        {
            title: "Cabbage",
            weight: "100kg",
            market: "BeeFarms",
            price: "300",
            url: require("@/assets/images/cabbages.jpg")
        },
        {
            title: "Cucumber",
            weight: "30kg",
            market: "BeeFarms",
            price: "150",
            url: require("@/assets/images/cucumber.jpg")
        },
         {
            title: "Tomato",
            weight: "50kg",
            market: "BeeFarms",
            price: "250",
            url: require("@/assets/images/tomatoes.jpg")
        },
        {
            title: "Cabbage",
            weight: "100kg",
            market: "BeeFarms",
            price: "300",
            url: require("@/assets/images/cabbages.jpg")
        },
        {
            title: "Cucumber",
            weight: "30kg",
            market: "BeeFarms",
            price: "150",
            url: require("@/assets/images/cucumber.jpg")
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Catalog" />
            <ScrollView contentContainerStyle={{ padding: 0 }} showsVerticalScrollIndicator={false}>
            
                <View style={{ height: 380, marginBottom: 20, paddingHorizontal: 20, borderRadius: 20 }}>
                    <ImageBackground
                        source={require('../../assets/images/cucumber.jpg')}
                        style={styles.background}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
                            style={styles.gradient}
                        >
                            <View style={styles.content}>
                                <Image source={require('../../assets/images/farmlogo.png')} style={{ width: 100, height: 100 }} />
                                <Text style={styles.heading}>Order Fresh Produce</Text>
                                <Text style={styles.subheading}>We supply fresh produce to hotels, lodges,restaurants and supermarkets</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                

                {/* You can map over the data instead of using FlatList if you're already in a ScrollView */}
                <View style={{ gap: 10, borderRadius: 20 }}>
                {crops.map((item, index) => (
                    <BeeCropCard key={index} crop={item} />
                ))}
                </View>

                {/* If you prefer to keep the FlatList for performance with a large list, you must provide its own height */}
                {/* <FlatList
                    data={crops}
                    renderItem={({ item }) => <CropCard crop={item} />}
                    keyExtractor={(item) => item.title}
                    contentContainerStyle={{ gap: 10, padding: 20 }}
                    // You must set a height on the FlatList if it's inside a ScrollView
                    style={{ height: 800 }}
                /> */}

                {/* The empty view with a large margin is no longer needed */}
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