import { useAuth } from '@/context/auth-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user } = useAuth();

  // if (!user) {
  //   return navigate('/login');
  // }

  return (
    <View style={styles.container}>
        <Image
          source={require('../../assets/images/farmlogo.png')}
          style={styles.image}
        />

        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
            Hey, {user?.data.user.name}!
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
            Welcome to the Farmers Hub
          </Text>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    marginTop: 100
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
});