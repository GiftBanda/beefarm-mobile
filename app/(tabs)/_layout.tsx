import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

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
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="house.fill" color={focused ? '#015115' : color} />,
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
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="message.fill" color={focused ? '#015115' : color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name="person.fill" color={focused ? '#015115' : color} />,
        }}
      />
    </Tabs>
  );
}
