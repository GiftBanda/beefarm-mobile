import { MedicineIcon } from '@/assets/svg/MedicineIcon';
import { SmartPhoneIcon } from '@/assets/svg/SmartPhoneIcon';
import { TakePicIcon } from '@/assets/svg/TakePicIcon';
import Button from '@/components/Button';
import { CropAnalysisResult } from '@/components/CropAnalysis';
import { LocationWeather } from '@/components/LocationWeather';
import { supabase } from '@/utils/supabase';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions, useMediaLibraryPermissions } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/auth-context';
import { useTaskCalendar } from '@/hooks/useTaskCalendar';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
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

const HomeDashboard = () => {

  const { user } = useAuth();
  const {
    selectedDate,
    tasksForSelectedDay,
  } = useTaskCalendar();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [permission, requestPermission] = useMediaLibraryPermissions();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fields, setFields] = useState<any[] | null>([]);


  const fetchFields = async () => {
    try {
      const response = await supabase.from('fields').select('*');
      const data = await response.data;
      setFields(data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  }

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
      Alert.alert("Please select an image first.");
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

  useEffect(() => {
    fetchFields();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={{ margin: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#22c55e', padding: 16, borderRadius: 12 }}>
           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome {user?.data.user.name}</Text>
           <Text style={{ fontSize: 12, color: '#667', marginBottom: 10 }}>
            Get insights on tasks, inventory, crop health and weather updates
          </Text>
          <Text style={styles.heading}>
            Scheduled Tasks for {dayjs(selectedDate).format("DD MMM YYYY")}
          </Text>
          <Text style={{ fontSize: 16, color: '#667', marginBottom: 10}}>
            There are {tasksForSelectedDay.length} tasks for today
          </Text>


          {tasksForSelectedDay.map((task) => (
            <View key={task.id} style={styles.task}>
              <Text style={styles.taskTitle}>{task.title}</Text>
            </View>
          ))}

        </View>

        <LocationWeather />

        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 24,
          marginHorizontal: 16,
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
            }}>Crop Treatment</Text>

          </View>}

          {
            !selectedImage && <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}>
              <View>
                <TakePicIcon />
                <Text style={{
                  fontSize: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>Take a Picture</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
              <View>
                <SmartPhoneIcon />
                <Text style={{
                  fontSize: 10,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
                >See Diagnosis</Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>+</Text>
              <View>
                <MedicineIcon />
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
                  <Pressable onPress={() => { setSelectedImage(null); setImageBase64(null); setAnalysisResult(null); setError(null); }}>
                    <Text style={styles.resetButton}>Reset</Text>
                  </Pressable>
                </View> : <View>
                  {analysisResult && <CropAnalysisResult analysisResult={analysisResult} />}
                  <Pressable onPress={() => { setSelectedImage(null); setImageBase64(null); setAnalysisResult(null); setError(null); }}>
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

        <Text style={{ marginHorizontal: 16, fontSize: 20, fontWeight: 'bold', marginVertical: 12 }}>Fields</Text>
        <View style={{ marginHorizontal: 16, marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {
            fields && fields.length > 0 && fields.map((field) => (
              <Link key={field.id} href={`/field/${field.id}`} style={styles.card}>
              <View>
                <Text style={styles.headerText}>{field.name}</Text>
              </View>
              </Link>
            ))
          }
        </View>

        <View style={{ height: 50 }}></View>

      </ScrollView>
      </SafeAreaView>
  )
}

export default HomeDashboard;

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
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#22c55e',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 200, borderRadius: 24 },
  buttonContainer: { marginTop: 20, width: '80%' },
  loader: { marginTop: 30 },
  errorText: { marginTop: 20, color: 'red', textAlign: 'center' },
  resetButton: { marginTop: 10, color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', padding: 10, borderRadius: 8 },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  task: {
    padding: 12,
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    marginBottom: 8,
  },
  taskTitle: {
    color: "#166534",
    fontSize: 14,
  },
  empty: {
    color: "#9ca3af",
  },
});