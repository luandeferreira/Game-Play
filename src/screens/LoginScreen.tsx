import React from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { Background } from '../components';
import { COLORS, FONTS } from '../theme';

interface LoginScreenProps {
  onNavigate: () => void;
}

const LoginScreen = ({ onNavigate }: LoginScreenProps) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={onNavigate}>
      <Background>
        {/* Forma geométrica (shape) - fica atrás do personagem */}
        <Image
          source={require('../../assets/shape.png')}
          style={styles.shapeImage}
          resizeMode="contain"
        />

        {/* Personagem por cima da shape */}
        <Image
          source={require('../../assets/character.png')}
          style={styles.characterImage}
          resizeMode="contain"
        />

        {/* Bloco de Textos */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Conecte-se{'\n'}e organize suas{'\n'}jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games favoritos com seus amigos
          </Text>
        </View>

        {/* Botão Entrar com Discord */}
        <View style={styles.button}>
          <View style={styles.buttonIconArea}>
            <Image
              source={require('../../assets/discord.png')}
              style={styles.buttonIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonDivider} />
          <View style={styles.buttonTextArea}>
            <Text style={styles.buttonText}>Entrar com Discord</Text>
          </View>
        </View>
      </Background>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  shapeImage: {
    position: 'absolute',
    width: 387,
    height: 359,
    top: 100,
    left: -6,
    opacity: 0.6,
  },
  characterImage: {
    position: 'absolute',
    width: 375,
    height: 304,
    top: 114.51,
    left: -1,
  },
  textContainer: {
    position: 'absolute',
    top: 394.51,
    left: 0,
    right: 0,
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
    position: 'absolute',
    width: 274,
    height: 56,
    left: 51,
    top: 628.51,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonIconArea: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 18,
  },
  buttonDivider: {
    width: 1,
    height: 56,
    backgroundColor: COLORS.primaryDark,
  },
  buttonTextArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.heading,
  },
});
