import { StyleSheet, View, Image, Pressable, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import { Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { useAssets } from 'expo-asset';

import { HomeScreen, LoginScreen, ScheduleScreen, ServerDetailsScreen } from './src/screens';
import { COLORS } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Rajdhani_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  const [assets] = useAssets([
    require('./assets/logo.png'),
    require('./assets/shape.png'),
    require('./assets/character.png'),
    require('./assets/discord.png'),
    require('./assets/tiagofoto.png'),
    require('./assets/ranqueada.png'),
    require('./assets/duelo.png'),
    require('./assets/diversao.png'),
    require('./assets/lol.png'),
    require('./assets/reddead.png'),
    require('./assets/csgo.png'),
    require('./assets/apex.png'),
    require('./assets/valorant.png'),
    require('./assets/gta.png'),
    require('./assets/minecraft.png'),
    require('./assets/battlefield.png'),
    require('./assets/lol-fundo.png'),
    require('./assets/tiagopic.png'),
    require('./assets/rodrigopic.png'),
    require('./assets/diegopic.png'),
    require('./assets/compartilhar.png'),
  ]);

  const [currentScreen, setCurrentScreen] = useState('Splash');
  const opacity = useRef(new Animated.Value(1)).current;

  const navigateTo = (screen: string) => {
    // Animação "Dissolve" de 300ms com ease-out
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(screen);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  if (!fontsLoaded || !assets) {
    return null;
  }

  if (currentScreen === 'ServerDetails') {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <ServerDetailsScreen onGoBack={() => navigateTo('Home')} />
      </Animated.View>
    );
  }

  if (currentScreen === 'Schedule') {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <ScheduleScreen onGoBack={() => navigateTo('Home')} />
      </Animated.View>
    );
  }

  if (currentScreen === 'Home') {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <HomeScreen
          onNavigateToSchedule={() => navigateTo('Schedule')}
          onNavigateToServerDetails={() => navigateTo('ServerDetails')}
        />
      </Animated.View>
    );
  }

  if (currentScreen === 'Login') {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <LoginScreen onNavigate={() => navigateTo('Home')} />
      </Animated.View>
    );
  }

  // Splash Screen
  return (
    <Animated.View style={{ flex: 1, opacity }}>
      <Pressable style={styles.splashContainer} onPress={() => navigateTo('Login')}>
        <View style={styles.splashContent}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.splashLogo}
            resizeMode="contain"
          />
        </View>
        <StatusBar style="light" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 344,
    height: 100,
  },
});
