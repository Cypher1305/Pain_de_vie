import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import 'react-native-reanimated';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (loaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        setSplashVisible(false);
      }, 5000);
    }
  }, [loaded]);

  if (!loaded || isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require('../assets/images/be.png')} style={styles.logo} />
        <Text style={styles.text}>Pain de Vie</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Cache l'en-tête pour toutes les pages
      }}
    />
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000814', 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
<Animated.View entering={FadeIn.duration(1500)} exiting={FadeOut.duration(1000)}>
    <Image source={require('../assets/images/be.png')} style={styles.logo} />
    <Text style={styles.text}>Pain de Vie</Text>
</Animated.View>
