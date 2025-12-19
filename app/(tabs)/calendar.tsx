import TaskCalendar from "@/components/TaskCalendar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function CalendarPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, gap: 8 }}>
            <Ionicons name="calendar" size={32} color="#14532D" />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#14532D', alignSelf: 'center', justifyContent: 'center' }}>
           Task Calendar
        </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#4B5563', marginBottom: 16, alignSelf: 'center' }}>
          Stay organized with your farming tasks
        </Text>
      <ScrollView><TaskCalendar /></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  safeArea: {
    flex: 1,
    padding: 16,
    marginTop: 24,
  },
});