import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../theme';

interface BackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Background = ({ children, style }: BackgroundProps) => (
  <LinearGradient
    colors={[COLORS.backgroundLight, COLORS.backgroundDark]}
    style={[styles.container, style]}
  >
    {children}
    <StatusBar style="light" />
  </LinearGradient>
);

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
