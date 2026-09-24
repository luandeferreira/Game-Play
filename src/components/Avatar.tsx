import React from 'react';
import { StyleSheet, Image, ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';

interface AvatarProps {
  urlImage: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Avatar = ({ urlImage, size = 48, style }: AvatarProps) => {
  const imageSize = size - 2;

  return (
    <LinearGradient
      colors={[COLORS.avatarBorderStart, COLORS.avatarBorderEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[
        styles.container,
        { width: size, height: size, borderRadius: 8 },
        style,
      ]}
    >
      <Image
        source={urlImage}
        style={[
          styles.avatar,
          { width: imageSize, height: imageSize, borderRadius: 8 },
        ]}
        resizeMode="cover"
      />
    </LinearGradient>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {},
});
