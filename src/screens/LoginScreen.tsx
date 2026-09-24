import React from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background, ButtonIcon } from '../components';
import { AppNavigationProp } from '../routes/types';
import { COLORS, FONTS } from '../theme';

interface LoginScreenProps {
  onNavigate?: () => void;
}

const LoginScreen = ({ onNavigate }: LoginScreenProps) => {
  const navigation = useNavigation<AppNavigationProp>();

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <Background>
      <Pressable style={styles.container} onPress={handleNavigate}>
        <SafeAreaView style={styles.safeArea}>
          {/* Ilustrações (Shape e Personagem) */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../assets/shape.png')}
              style={styles.shapeImage}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/character.png')}
              style={styles.characterImage}
              resizeMode="contain"
            />
          </View>

          {/* Conteúdo textual e ação */}
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                Conecte-se{'\n'}e organize suas{'\n'}jogatinas
              </Text>
              <Text style={styles.subtitle}>
                Crie grupos para jogar seus games favoritos com seus amigos
              </Text>
            </View>

            {/* Botão Entrar com Discord */}
            <ButtonIcon
              title="Entrar com Discord"
              onPress={handleNavigate}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
      </Pressable>
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  illustrationContainer: {
    width: '100%',
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 16,
  },
  shapeImage: {
    position: 'absolute',
    width: 387,
    height: 359,
    opacity: 0.6,
  },
  characterImage: {
    width: 375,
    height: 304,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.titleBold,
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: COLORS.heading,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: COLORS.heading,
  },
  button: {
    width: 274,
  },
});
