import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface HeaderProps {
  title: string;
  onGoBack?: () => void;
  action?: React.ReactNode;
}

const Header = ({ title, onGoBack, action }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 16 : 56;

  return (
    <LinearGradient
      colors={[COLORS.cardGradientStart, COLORS.cardGradientEnd]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[styles.container, { paddingTop }]}
    >
      {onGoBack ? (
        <Pressable style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={styles.title}>{title}</Text>

      {action ? (
        <View style={styles.actionContainer}>{action}</View>
      ) : (
        <View style={styles.spacer} />
      )}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 22,
    paddingHorizontal: LAYOUT.headerHorizontalPadding,
    shadowColor: '#11173D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 12,
    zIndex: 10,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: COLORS.heading,
  },
  title: {
    fontFamily: FONTS.titleBold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: COLORS.heading,
  },
  actionContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 24,
  },
});
