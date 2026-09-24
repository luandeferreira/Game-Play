import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../routes/types';
import { COLORS } from '../theme';

interface SplashScreenProps {
  onFinish?: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const navigation = useNavigation<AppNavigationProp>();

  const handlePress = () => {
    if (onFinish) {
      onFinish();
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <StatusBar style="light" />
    </Pressable>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
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
  logo: {
    width: 344,
    height: 100,
  },
});
