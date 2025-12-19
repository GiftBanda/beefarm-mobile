import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions, useMediaLibraryPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";


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

export const usePlantTreatment = () => {
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
    
   return {
    selectedImage,
    pickImageAsync,
    takePhotoAsync,
    handleAnalyzePress,
    isLoading,
    error,
    analysisResult,
    setAnalysisResult,
    setSelectedImage,
    setImageBase64,
    setError,
   }
}