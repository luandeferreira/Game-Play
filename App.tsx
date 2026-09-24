import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable, Animated, Text } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { useAssets } from 'expo-asset';

// Tela Home simplificada para receber a navegação
const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>Tela Home</Text>
    <StatusBar style="light" />
  </View>
);

const LoginScreen = ({ onNavigate }: { onNavigate: () => void }) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={onNavigate}>
      <LinearGradient
        colors={['#0E1647', '#0A1033']}
        style={styles.loginContainer}
      >
        {/* Forma geométrica (shape) - fica atrás do personagem */}
        <Image 
          source={require('./assets/shape.png')} 
          style={styles.loginShapeImage}
          resizeMode="contain"
        />
        
        {/* Personagem por cima da shape */}
        <Image 
          source={require('./assets/character.png')} 
          style={styles.loginCharacterImage}
          resizeMode="contain"
        />

        {/* Bloco de Textos */}
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginTitle}>
            Conecte-se{'\n'}e organize suas{'\n'}jogatinas
          </Text>
          <Text style={styles.loginSubtitle}>
            Crie grupos para jogar seus games favoritos com seus amigos
          </Text>
        </View>

        {/* Botão Entrar com Discord */}
        <View style={styles.loginButton}>
          <View style={styles.loginButtonIconArea}>
            <Image
              source={require('./assets/discord.png')}
              style={styles.loginButtonIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.loginButtonDivider} />
          <View style={styles.loginButtonTextArea}>
            <Text style={styles.loginButtonText}>Entrar com Discord</Text>
          </View>
        </View>
        
        <StatusBar style="light" />
      </LinearGradient>
    </Pressable>
  );
};

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
      // Fade in para a nova tela
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

  if (currentScreen === 'Home') {
    return (
      <Animated.View style={{ flex: 1, opacity }}>
        <HomeScreen />
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

  return (
    <Animated.View style={{ flex: 1, opacity }}>
      <Pressable style={styles.container} onPress={() => navigateTo('Login')}>
        <View style={styles.content}>
          {/* Logo da Splash Screen */}
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
  container: {
    flex: 1,
    backgroundColor: '#0E1647',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
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
  loginContainer: {
    flex: 1,
    position: 'relative',
  },
  loginShapeImage: {
    position: 'absolute',
    width: 387,
    height: 359,
    top: 100,
    left: -6,
    opacity: 0.6,
  },
  loginCharacterImage: {
    position: 'absolute',
    width: 375,
    height: 304,
    top: 114.51,
    left: -1,
  },
  loginTextContainer: {
    position: 'absolute',
    top: 394.51,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loginTitle: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: '#DDE3F0',
    marginBottom: 16,
  },
  loginSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: '#DDE3F0',
  },
  loginButton: {
    position: 'absolute',
    width: 274,
    height: 56,
    left: 51,
    top: 628.51,
    backgroundColor: '#E61C44',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  loginButtonIconArea: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonIcon: {
    width: 24,
    height: 18,
  },
  loginButtonDivider: {
    width: 1,
    height: 56,
    backgroundColor: '#991F36',
  },
  loginButtonTextArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    lineHeight: 25,
    color: '#DDE3F0',
  },
});
