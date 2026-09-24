import React from 'react';
import { StyleSheet, Image, Text, Pressable, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../theme';

interface CategoryCardProps {
  name: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

const CategoryCard = ({ name, icon, onPress }: CategoryCardProps) => (
  <Pressable style={styles.card} onPress={onPress}>
    <LinearGradient
      colors={[COLORS.cardGradientStart, COLORS.cardGradientEnd]}
      style={styles.gradient}
    >
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{name}</Text>
    </LinearGradient>
  </Pressable>
);

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  label: {
    fontFamily: FONTS.titleBold,
    fontSize: 15,
    color: COLORS.heading,
    textAlign: 'center',
  },
});
