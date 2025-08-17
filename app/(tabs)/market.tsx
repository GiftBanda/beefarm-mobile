import { markets } from "@/assets/data/markets";
import { CropCard } from "@/components/CropCard";
import { Header } from "@/components/Header";
import { useMarket } from "@/hooks/market/useMarket";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Market = () => {

    const { selectedMarket, setSelectedMarket, searchQuery, setSearchQuery, isActive, setIsActive, filteredCrops } = useMarket();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <View style={{ padding: 16, backgroundColor: '#f8f8f8' }}>
                <Text style={styles.header}>Daily</Text>
                <Text style={styles.header}>Market Prices</Text>
                <TextInput
                    style={{ height: 40, borderRadius: 50, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
                    placeholder="Search for by crop name"
                    keyboardType='default'
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, gap: 10, paddingBottom: 15, paddingTop: 5, marginBottom: 16 }}>
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
                            <View style={{ padding: 16, backgroundColor: '#ffff', borderRadius: 12 }}>
                                {
                                    filteredCrops.map((crop, index) => (
                                        <CropCard key={index} crop={crop} />
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
        minHeight: '90%',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})