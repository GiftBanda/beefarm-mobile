import { MedicineIcon } from '@/assets/svg/MedicineIcon';
import { SmartPhoneIcon } from '@/assets/svg/SmartPhoneIcon';
import { TakePicIcon } from '@/assets/svg/TakePicIcon';
import { BestSellingCrops } from '@/components/BestSellingCrops';
import Button from '@/components/Button';
import { CropAnalysisResult } from '@/components/CropAnalysis';
import { LocationWeather } from '@/components/LocationWeather';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions, useMediaLibraryPermissions } from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the shape of the JSON response from the backend
interface AnalysisResult {
  plantName: string;
  identifiedIssue: string;
  symptomsDescription: string;
  suggestedActions: string[];
  disclaimer: string;
}

// --- Define backend endpoint ---
const BACKEND_API_URL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/plant/analyze`;


export default function ImagePickerExampleTS() {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);


  // Use the built-in hook from expo-image-picker to handle permissions
  // Permissions Hooks for both Camera and Media Library
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permission, requestPermission] = useMediaLibraryPermissions();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const pickImageAsync = async () => {

    if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      // If permission is not granted, request it
      const permissionResponse = await requestPermission();
      if (permissionResponse.status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert(
          'Permission Required',
          'You need to grant permission to access the photo library.'
        );
        return;
      }
    }

    

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      // We need the base64 representation for our backend
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
      setAnalysisResult(null); // Clear previous results
      setError(null);
    } else {
      setSelectedImage(null);
      setImageBase64(null);
    }
  };

  const takePhotoAsync = async () => {
    if (cameraPermission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      const permissionResponse = await requestCameraPermission();
      if (permissionResponse.status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert('Permission Required', 'You need to grant camera access to take a photo.');
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };


  const handleAnalyzePress = async () => {
    if (!imageBase64) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    // This is the equivalent of the code you selected
    try {
      const payload = {
        // We assume JPEG for simplicity, but you could get this from the image picker result if needed
        mimeType: 'image/jpeg',
        imageData: imageBase64,
      };

      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Something went wrong on the server.');
      }

      setAnalysisResult(responseJson);
      setIsLoading(false);

    } catch (e: string | any) {
      setError(`Failed to analyze plant: ${e.message}`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

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

        <LocationWeather />

        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 24,
          margin: 16,
          marginBottom: 35,
          borderWidth: 1,
          borderColor: '#22c55e',
          borderRadius: 12,
          backgroundColor: '#fff',
        }}>

          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} contentFit='cover' />}
          {!selectedImage && <View style={{
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              lineHeight: 24,
            }}>Heal your Crop</Text>

          </View>}

          {
            !selectedImage && <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}>
              <View>
                <Text>
                <TakePicIcon />
                </Text>
                <Text style={{
                  fontSize: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>Take a Picture</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
              <View>
                <Text>
                <SmartPhoneIcon />
                </Text>
                <Text style={{
                  fontSize: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
                >See Diagnosis</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
              <View>
                <Text>
                <MedicineIcon />
                </Text>
                <Text style={{
                  fontSize: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>Get Medicine</Text>
              </View>
            </View>
          }

          {
            selectedImage ? <View>
            {
              !analysisResult ? <View>
                <Button label='Analyze Plant' isLoading={isLoading} onPress={() => handleAnalyzePress()} />
                <Pressable onPress={() => {setSelectedImage(null); setImageBase64(null); setAnalysisResult(null); setError(null);}}>
                <Text style={styles.resetButton}>Reset</Text>
              </Pressable>
                </View> : <View>
                  {analysisResult && <CropAnalysisResult analysisResult={analysisResult} />}
                  <Pressable onPress={() => {setSelectedImage(null); setImageBase64(null); setAnalysisResult(null); setError(null);}}>
                <Text style={styles.resetButton}>Reset</Text>
              </Pressable>
              </View>
            }
              
              
            </View> : <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%'
            }}>
              <Button label="Gallery" onPress={() => pickImageAsync()} />
              <Button label="Camera" onPress={() => takePhotoAsync()} />
            </View>
          }
        </View>

        
        

        {!permission?.granted && (
          <Text style={styles.permissionText}>
            Media library permission is currently {permission?.status}.
          </Text>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

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
  image: { width: 200, height: 200, borderRadius: 24 },
  buttonContainer: { marginTop: 20, width: '80%' },
  loader: { marginTop: 30 },
  errorText: { marginTop: 20, color: 'red', textAlign: 'center' },
  resetButton: { marginTop: 10, color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 8 },
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
    }
});