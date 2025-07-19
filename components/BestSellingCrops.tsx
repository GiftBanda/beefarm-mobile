import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CropCard } from "./CropCard";


export const BestSellingCrops = () => {
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
      market: "Kibera Market",
      price: "300",
      url: require("@/assets/images/cabbages.jpg")
    },
    {
      title: "Cucumber",
      weight: "30kg",
      market: "Nairobi Market",
      price: "150",
      url: require("@/assets/images/cucumber.jpg")
    }
  ];
    return (
         <View style={styles.container}>
                  <Text style={styles.headerText}>Daily Market Prices</Text>
                  <Text style={styles.headerSubText}>Best Selling Crops</Text>
                  <View style={styles.cropContainer}>
                  {
                    crops.map((crop, index) => (
                      <CropCard key={index} crop={crop} />
                    ))
                  }
                  </View>

                  <Link href="/market" asChild>
                    <Text style={{ color: '#14532D', fontWeight: 'bold', textAlign: 'center', marginTop: 16 }}>View All</Text>
                  </Link>

                  
                  
                </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        //height: 40,
        padding: 16,
        margin: 16,
        borderRadius: 12,
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      headerText: {
        //color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        //marginBottom: 16,
      },
      headerSubText: {
        //color: '#fff',
        fontSize: 14,
        //fontWeight: 'bold',
        marginBottom: 16,
        color: 'grey',
        lineHeight: 20,
      },
      subText: {
        //color: '#fff',
        fontSize: 14,
        //fontWeight: 'bold',
        // marginBottom: 16,
        color: 'grey',
        lineHeight: 20,
      },
      cropContainer: {
        //borderWidth: 1,
        borderColor: '#22c55e',
        borderRadius: 12,
        //padding: 16,
      },
      cropCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#22c55e',
        padding: 10,
        borderRadius: 12,
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