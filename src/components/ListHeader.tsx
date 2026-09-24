import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface ListHeaderProps {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

const ListHeader = ({ title, subtitle, style }: ListHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.horizontalPadding,
    marginBottom: 24,
  },
  title: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
    textAlign: 'right',
  },
});
