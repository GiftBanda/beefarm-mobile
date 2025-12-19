import { useField } from "@/hooks/useField";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, Text, View } from "react-native";


export default function FieldPage() {

  const { fieldDetails } = useField();

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#22c55e', padding: 16, borderRadius: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Ionicons name="leaf" size={24} color="#14532D" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {fieldDetails ? fieldDetails.name : 'Loading...'}
        </Text>
        <Text style={{ fontSize: 16, color: '#666', marginLeft: 8 }}>
          (Soil Type: {fieldDetails ? fieldDetails.soil_type : 'Loading...'})
        </Text>
        
      </View>
      <View>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Notes: {fieldDetails ? fieldDetails.notes : 'Loading...'}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Irrigation Type:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails ? fieldDetails.irrigation_type : 'Loading...'}
        </Text>
      </View>
      </View>

      <View style={{ marginBottom: 24, backgroundColor: '#fff', borderWidth: 1, borderColor: '#22c55e', padding: 16, borderRadius: 12 }}>
      <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Crop:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.name).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Notes:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.notes).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Plant Date:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.plant_date).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Harvest Date:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.harvest_date).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Expected Yield:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.yield_kg + ' kg').join(', ')
           : 'Loading...'}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Area (acres):</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails ? fieldDetails.area : 'Loading...'}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Code:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails ? fieldDetails.code : 'Loading...'}
        </Text>
      </View>
       
      <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Health Status:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.health_status).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Season:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.season).join(', ')
           : 'Loading...'}
        </Text>
      </View>
       <View style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Varienty:</Text>
        <Text style={{ fontSize: 16 }}>
          {fieldDetails && fieldDetails.crops ? fieldDetails.crops.map((crop: any) => crop.variety).join(', ')
           : 'Loading...'}
        </Text>
      </View>
      </View>
      
        
    </ScrollView>
  );
}