import React from 'react';
import { StyleSheet, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface TextAreaProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const TextArea = ({ style, containerStyle, maxLength = 100, ...rest }: TextAreaProps) => {
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
        multiline
        maxLength={maxLength}
        textAlignVertical="top"
        {...rest}
      />
    </LinearGradient>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  container: {
    height: 95,
    borderRadius: LAYOUT.cardBorderRadius,
    marginBottom: 32,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.heading,
  },
});
