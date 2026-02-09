import { fetchUserFromToken, login, register } from '@/services/auth.service';
import { ApiResponse } from '@/types/user.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native'; // Using React Native components for UI
// 1. Define types for the user and the authentication context

interface AuthContextType {
  user: ApiResponse | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

// 2. Create the Auth Context
// This context will hold the authentication state and functions.
const AuthContext = createContext<AuthContextType | null>(null);

// 3. Create a custom hook to use the Auth Context
// This hook simplifies consuming the context in components.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    // This error helps ensure the hook is used within an AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 4. Create the Auth Provider component
// This component will manage the authentication state and provide it to its children.
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // State to hold the authenticated user object.
  const [user, setUser] = useState<ApiResponse | null>(null);

  // State to indicate if authentication operations are in progress.
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // State to store any authentication errors.
  const [error, setError] = useState<string | null>(null);

  // useEffect to handle initial authentication check (e.g., check for stored token)
  useEffect(() => {
    const checkAuthStatus = async (): Promise<void> => {
      try {
        // Simulate an asynchronous check for a stored session/token
        // In a real app, you would check AsyncStorage, secure storage, or a global state.
        
        setIsLoading(true);
        setError(null);
        //await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // Example: If a token exists, fetch user data or set user
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          // Validate token, fetch user profile, etc.
          const userData = await fetchUserFromToken(storedToken);
          setUser(userData.data);
        } else {
          setUser(null); // No stored session
        }
      } catch (e: any) { // Use 'any' for caught error if type is unknown
        setError("Failed to initialize authentication.");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // Run once on component mount

  // Function to handle user sign-up
  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you would make an API call to your backend or Firebase Auth:
      const response = await register(email, password, name);

      const data = await response.data;

      // If sign-up is successful:
      if (data) {
        //const userData: User = { id: 'user123', email: email };
        setUser(data);
        await AsyncStorage.setItem('userToken', data.token);
        // await AsyncStorage.setItem('userToken', data.token); // Store token
        Alert.alert("Success", "Signed up successfully!");
        return true; // Indicate success
      } else {
        setError('Failed to sign up. Please try again.');
        Alert.alert("Error", "Failed to sign up. Please try again.");
        return false; // Indicate failure
      }
    } catch (e: any) {
      setError('Failed to sign up. Please try again.');
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };


  // Function to handle user sign-in
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate an API call for sign-in
      //await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      console.log('Signing in with:', email, password);

      // In a real app, you would make an API call to your backend or Firebase Auth:
      const response = await login(email, password);

      const data = await response.data;

      // If sign-in is successful:
      if (data) {
        //const userData: User = { id: 'user123', email: email };
        setUser(data);
        await AsyncStorage.setItem('userToken', data.token);
        // await AsyncStorage.setItem('userToken', data.token); // Store token
        Alert.alert("Success", "Signed in successfully!");
        router.push('/'); // Navigate to home screen after successful login
        return true; // Indicate success
      } else {
        setError('Invalid credentials.');
        Alert.alert("Error", "Invalid credentials.");
        return false; // Indicate failure
      }
    } catch (e: any) {
      setError('Failed to sign in. Please try again.');
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user sign-out
  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate an API call for sign-out or clearing session
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      // In a real app, you would clear local storage, invalidate tokens, etc.:
      await AsyncStorage.removeItem('userToken');
      // await firebase.auth().signOut();

      setUser(null);
      Alert.alert("Success", "Signed out successfully!");
    } catch (e: any) {
      console.error("Sign-out error:", e);
      setError('Failed to sign out. Please try again.');
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // The value provided to consumers of the context
  const authContextValue: AuthContextType = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
  };

  // If still loading the initial auth status, show a loading indicator.
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text style={{ marginTop: 10 }}>Loading authentication...</Text>
  //     </View>
  //   );
  // }

  // Once loading is complete, render the children with the context value.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};