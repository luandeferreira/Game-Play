import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { useAssets } from 'expo-asset';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Routes } from './src/routes';

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

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Routes />
    </SafeAreaProvider>
  );
}
