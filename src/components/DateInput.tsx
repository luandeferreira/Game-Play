import React from 'react';
import { StyleSheet, View, Text, TextInput, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface DateInputProps {
  day: string;
  month: string;
  onChangeDay: (value: string) => void;
  onChangeMonth: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const DateInput = ({ day, month, onChangeDay, onChangeMonth, style }: DateInputProps) => {
  return (
    <LinearGradient
      colors={[COLORS.inputGradient[0], COLORS.inputGradient[1]]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[styles.container, style]}
    >
      <TextInput
        style={styles.field}
        value={day}
        onChangeText={(text) => onChangeDay(text.replace(/[^0-9]/g, '').slice(0, 2))}
        placeholder="DD"
        placeholderTextColor={COLORS.body}
        keyboardType="number-pad"
        maxLength={2}
      />
      <Text style={styles.separator}>/</Text>
      <TextInput
        style={styles.field}
        value={month}
        onChangeText={(text) => onChangeMonth(text.replace(/[^0-9]/g, '').slice(0, 2))}
        placeholder="MM"
        placeholderTextColor={COLORS.body}
        keyboardType="number-pad"
        maxLength={2}
      />
    </LinearGradient>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 152,
    height: LAYOUT.inputHeight,
    borderRadius: LAYOUT.cardBorderRadius,
  },
  field: {
    width: 40,
    height: LAYOUT.inputHeight,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.heading,
  },
  separator: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.body,
    marginHorizontal: 2,
  },
});
