import { BestSellingCrops } from '@/components/BestSellingCrops';
import { GradientCard } from '@/components/GradientCard';
import { Image, } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ImagePickerExampleTS() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/farmlogo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>BeeFarms</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <GradientCard
          title="Order Fresh Produce"
          description="We supply fresh produce to hotels, lodges,restaurants and supermarkets"
          image={require('../../assets/images/watermelon.jpg')}
          btnText="Order Now"
          link="/catalog"
        />

        <GradientCard
          title="Heal Your Crop"
          description="Try our crop analysis AI to heal your crop"
          image={require('../../assets/images/spray.jpg')}
          btnText="Try Now"
          link="/treatplant"
        />

        <BestSellingCrops />

        <View style={{ height: 50 }}></View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  permissionText: {
    marginTop: 10,
    color: 'grey',
    textAlign: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 200, borderRadius: 24 },
  buttonContainer: { marginTop: 20, width: '80%' },
  loader: { marginTop: 30 },
  errorText: { marginTop: 20, color: 'red', textAlign: 'center' },
  resetButton: { marginTop: 10, color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', padding: 10, borderRadius: 8 },
  card: {
    backgroundColor: '#547A64',
    padding: 10,
    height: 100,
    borderRadius: 12,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});