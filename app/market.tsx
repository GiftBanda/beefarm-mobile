import { CropCard } from "@/components/CropCard";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Market = () => {
    const markets = [
        { id: 1, name: 'Soweto' },
        { id: 2, name: 'Kasumbalesa' },
        { id: 3, name: 'Chisokone' },
        { id: 4, name: 'Kanyama' },
        { id: 5, name: 'City Market' },
        { id: 6, name: 'Kabwe' },
        { id: 7, name: 'Livingstone' },
        { id: 8, name: 'Chipata' },
        { id: 9, name: 'Mansa' },
        { id: 10, name: 'Solwezi' },
    ];

    const crops = [
        {
            title: "Tomato",
            weight: "50kg",
            market: "Soweto Market",
            price: "250",
            url: require("@/assets/images/tomatoes.jpg")
        },
        {
            title: "Cabbage",
            weight: "100kg",
            market: "Soweto Market",
            price: "300",
            url: require("@/assets/images/cabbages.jpg")
        },
        {
            title: "Cucumber",
            weight: "30kg",
            market: "Soweto Market",
            price: "150",
            url: require("@/assets/images/cucumber.jpg")
        },
        {
            title: "Tomato",
            weight: "50kg",
            market: "Soweto Market",
            price: "250",
            url: require("@/assets/images/tomatoes.jpg")
        },
        {
            title: "Cabbage",
            weight: "100kg",
            market: "Soweto Market",
            price: "300",
            url: require("@/assets/images/cabbages.jpg")
        },
        {
            title: "Cucumber",
            weight: "30kg",
            market: "Soweto Market",
            price: "150",
            url: require("@/assets/images/cucumber.jpg")
        },
    ];

    const [selectedMarket, setSelectedMarket] = useState<string>('Soweto');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Market" />
            <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
                <Text style={styles.header}>Daily</Text>
                <Text style={styles.header}>Market Prices</Text>
                <TextInput
                    style={{ height: 40, borderRadius: 50, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
                    placeholder="Search for by crop name"
                    //secureTextEntry={showPassword} // Example of secure text entry
                    keyboardType='default' // Example of keyboard type
                //value={password}
                //onChangeText={setPassword}
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, gap: 10, paddingVertical: 5, marginBottom: 16 }}>
                {
                    markets.map((market) => (
                        <Pressable key={market.id} style={{ height: 40, padding: 10, borderWidth: 1, borderColor: '#015115', backgroundColor: `${selectedMarket === market.name ? '#015115' : '#fff'}`, borderRadius: 25 }}
                            onPress={() => { setSelectedMarket(market.name); setIsActive(!isActive); }}
                        >
                            <Text style={{ color: `${selectedMarket === market.name ? '#fff' : '#015115'}`, fontWeight: 'bold' }}>{market.name}</Text>
                        </Pressable>
                    ))
                }
            </ScrollView>

            <ScrollView contentContainerStyle={styles.container}>

                    {
                        selectedMarket.trim() === 'Soweto' && (
                            <View style={{ padding: 16, marginTop: 20, backgroundColor: '#ffff', borderRadius: 12 }}>
                                {
                                    crops.map((crop) => (
                                        <CropCard key={crop.title} crop={crop} />
                                    ))
                                }

                            </View>
                        )
                    }
                    {
                        selectedMarket === 'Kasumbalesa' && (
                            <View>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Selected Market: Kasumbalesa</Text>
                            </View>
                        )
                    }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Market;

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        justifyContent: 'center',
        //padding: 16,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    cropContainer: {
        //  borderWidth: 1,
        // borderColor: '#22c55e',
        // borderRadius: 12,
        // padding: 16,
    },
    cropCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cropCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cropCardText: {
        // marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        //color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})