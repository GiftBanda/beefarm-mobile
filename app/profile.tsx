import { HelloWave } from '@/components/HelloWave';
import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />

        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
            Hey <HelloWave />, {user?.data.user.name}!
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
            Welcome to the Farmers Hub
          </Text>

          <Pressable
            onPress={signOut}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Logout
            </Text>
          </Pressable>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100
  },
  image: {
    width: 260,
    height: 170,
    borderRadius: 8,
  },
});