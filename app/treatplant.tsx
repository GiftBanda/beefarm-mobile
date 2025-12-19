import { MedicineIcon } from '@/assets/svg/MedicineIcon';
import { SmartPhoneIcon } from '@/assets/svg/SmartPhoneIcon';
import { TakePicIcon } from '@/assets/svg/TakePicIcon';
import Button from '@/components/Button';
import { CropAnalysisResult } from '@/components/CropAnalysis';
import { Header } from '@/components/Header';
import { LocationWeather } from '@/components/LocationWeather';
import { usePlantTreatment } from '@/hooks/usePlantTreatment';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TreatPlant = () => {
      const {
        selectedImage,
        pickImageAsync,
        takePhotoAsync,
        handleAnalyzePress,
        isLoading,
        error,
        analysisResult,
        setSelectedImage,
        setImageBase64,
        setAnalysisResult,
        setError,
      } = usePlantTreatment();
      
    return (
        <SafeAreaView>
              <Header />
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
        
                <View style={{ height: 50 }}></View>
        
              </ScrollView>
            </SafeAreaView>
    )
}

export default TreatPlant

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
});