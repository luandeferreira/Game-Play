import React from 'react';
import { StyleSheet, Image, Text, Pressable, ImageSourcePropType, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../theme';

interface CategoryCardProps {
  name: string;
  icon: ImageSourcePropType;
  selected?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({ name, icon, selected = false, onPress }: CategoryCardProps) => (
  <Pressable
    style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
    onPress={onPress}
  >
    <LinearGradient
      colors={[COLORS.cardGradientStart, COLORS.cardGradientEnd]}
      style={styles.gradient}
    >
      {/* Checkbox indicator */}
      <View
        style={[
          styles.checkbox,
          selected ? styles.checkboxSelected : styles.checkboxDefault,
        ]}
      />
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
  cardDefault: {
    opacity: 0.5,
  },
  cardSelected: {
    opacity: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  checkboxDefault: {
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
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
