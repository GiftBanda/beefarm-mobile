import { BestSellingCrops } from '@/components/BestSellingCrops';
import { Image, } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ImagePickerExampleTS() {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

        <View style={{ height: 340, marginBottom: 10, paddingHorizontal: 20 }}>
          <ImageBackground
            source={require('../../assets/images/watermelon.jpg')}
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
                <Link href="/catalog" style={styles.button}>
                  <Text style={styles.buttonText}>Order Now</Text>
                </Link>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

         <View style={{ height: 340, marginBottom: 10, paddingHorizontal: 20 }}>
          <ImageBackground
            source={require('../../assets/images/spray.jpg')}
            style={styles.background}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
              style={styles.gradient}
            >
              <View style={styles.content}>
                <Image source={require('../../assets/images/farmlogo.png')} style={{ width: 100, height: 100 }} />
                <Text style={styles.heading}>Heal Your Crop</Text>
                <Text style={styles.subheading}>Try our crop analysis AI to heal your crop</Text>
                <Link href="/treatplant" style={styles.button}>
                  <Text style={styles.buttonText}>Try Now</Text>
                </Link>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

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
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 16,
    //width: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
   background: {
        flex: 1,
        //marginTop: 10,
        borderRadius: 20,
        objectFit: 'cover',
    },
    gradient: {
        flex: 1,
        //borderRadius: 20,
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