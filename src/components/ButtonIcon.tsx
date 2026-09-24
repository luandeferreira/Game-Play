import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface ButtonIconProps {
  title: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const ButtonIcon = ({
  title,
  icon = require('../../assets/discord.png'),
  onPress,
  style,
  disabled = false,
}: ButtonIconProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <>
          <View style={styles.iconArea}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
          <View style={styles.divider} />
        </>
      )}
      <View style={styles.textArea}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: {
    height: LAYOUT.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.cardBorderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconArea: {
    width: 56,
    height: LAYOUT.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 18,
  },
  divider: {
    width: 1,
    height: LAYOUT.buttonHeight,
    backgroundColor: COLORS.primaryDark,
  },
  textArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.heading,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
