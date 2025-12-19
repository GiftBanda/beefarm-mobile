import HomeDashboard from '@/components/HomeDashboard';
import { useAuth } from '@/context/auth-context';
import { Redirect } from 'expo-router';
import React from 'react';


export default function ImagePickerExampleTS() {
  const { user } = useAuth();
  
    if (!user) {
      return <Redirect href="/login" />;
    }
  return (
    <HomeDashboard  />
  );
}