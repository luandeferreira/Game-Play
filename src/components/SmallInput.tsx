import React from 'react';
import { StyleSheet, TextInput, TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface SmallInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const SmallInput = ({ style, containerStyle, ...rest }: SmallInputProps) => {
  return (
    <LinearGradient
      colors={[COLORS.inputGradient[0], COLORS.inputGradient[1]]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[styles.container, containerStyle]}
    >
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={COLORS.body}
        keyboardType="number-pad"
        maxLength={2}
        {...rest}
      />
    </LinearGradient>
  );
};

export default SmallInput;

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: LAYOUT.inputHeight,
    borderRadius: LAYOUT.cardBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: LAYOUT.inputHeight,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.heading,
  },
});
