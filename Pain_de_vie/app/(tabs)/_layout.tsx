import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Librairie d'icônes

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Couleur active
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault, // Couleur inactive
        headerShown: false, // Masquer l'en-tête des pages
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparence pour iOS
          },
          android: {
            elevation: 4, // Ombre pour Android
          },
          default: {},
        }),
      }}
    >
      {/* Onglet Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil', // Nom affiché dans la barre
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Onglet Favoris */}
      <Tabs.Screen
        name="star"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />

      
    </Tabs>
  );
}
