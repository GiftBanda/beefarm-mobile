import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import Button from '@/components/Button';
import { AuthProvider } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Agronova', headerRight: () => <Button label='G' /> }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="spray-advisor" options={{ headerShown: false }}/>
        <Stack.Screen name="catalog" options={{ headerShown: false }}/>
        <Stack.Screen name="treatplant" options={{ headerShown: false }}/>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="create-order" options={{ headerShown: false }} />
        <Stack.Screen name="field/[id]" options={{ headerShown: true, title: 'Field Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}
