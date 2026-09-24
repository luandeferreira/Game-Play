import React from 'react';
import { StyleSheet, View, Text, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface ServerBannerProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const ServerBanner = ({ image, title, description }: ServerBannerProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(18, 29, 51, 0.61)', 'rgba(18, 29, 51, 0.83)', '#121D33']}
        locations={[0, 0.46, 0.77, 1]}
        style={styles.overlay}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default ServerBanner;

const styles = StyleSheet.create({
  container: {
    height: 234,
    position: 'relative',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 234,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: LAYOUT.horizontalPadding,
    right: LAYOUT.horizontalPadding,
    paddingBottom: 16,
  },
  title: {
    fontFamily: FONTS.titleBold,
    fontSize: 28,
    lineHeight: 36,
    color: COLORS.heading,
    marginBottom: 8,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.heading,
  },
});
