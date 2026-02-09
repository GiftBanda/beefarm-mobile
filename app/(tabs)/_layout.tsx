import { Link, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#ffffff',
                elevation: 5,
                height: 70,
                paddingTop: 14
            },
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarHideOnKeyboard: true
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          headerTitle: () => <Image source={require('@/assets/images/logo.png')} style={{ width: 80, height: 50 }} />,
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="house.fill" color={focused ? '#015115' : color} />,
          headerRight: () => <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
            <Link href="/chat"><IconSymbol size={24} name="message.fill" color={colorScheme === 'dark' ? '#fff' : '#015115'} /></Link>
            <Link href="/profile"><IconSymbol size={24} name="person.fill" color={colorScheme === 'dark' ? '#fff' : '#015115'} /></Link>
            </View>,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="calendar" color={focused ? '#015115' : color} />,
        }}
      />
       <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="storefront.fill" color={focused ? '#015115' : color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="list.bullet.clipboard.fill" color={focused ? '#015115' : color} />,
        }}
      />
      <Tabs.Screen
        name="data-library"
        options={{
          title: 'Data Library',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="person.fill" color={focused ? '#015115' : color} />,
        }}
      />
    </Tabs>
  );
}
