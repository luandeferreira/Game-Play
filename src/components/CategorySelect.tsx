import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import CategoryCard from './CategoryCard';
import { CATEGORIES } from '../mocks';
import { LAYOUT } from '../theme';

interface CategorySelectProps {
  categorySelected?: string | null;
  setCategory?: (categoryId: string) => void;
  hasPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CategorySelect = ({
  categorySelected,
  setCategory,
  hasPadding = false,
  style,
}: CategorySelectProps) => {
  return (
    <View style={[styles.container, hasPadding && styles.padding, style]}>
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.id}
          name={cat.name}
          icon={cat.icon}
          selected={categorySelected === cat.id}
          onPress={setCategory ? () => setCategory(cat.id) : undefined}
        />
      ))}
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  padding: {
    paddingHorizontal: LAYOUT.horizontalPadding,
  },
});
