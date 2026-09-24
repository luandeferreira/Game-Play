import React from 'react';
import { StyleSheet, View, Text, Pressable, ImageSourcePropType } from 'react-native';
import Avatar from './Avatar';
import { COLORS, FONTS } from '../theme';

interface ProfileProps {
  avatar: ImageSourcePropType;
  name: string;
  subtitle: string;
  onAddPress?: () => void;
}

const Profile = ({ avatar, name, subtitle, onAddPress }: ProfileProps) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Avatar urlImage={avatar} />
      <View style={styles.info}>
        <Text style={styles.greeting}>
          Olá, <Text style={styles.greetingBold}>{name}</Text>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {onAddPress && (
        <Pressable style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      )}
    </View>
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  greeting: {
    fontFamily: FONTS.regular,
    fontSize: 24,
    color: COLORS.heading,
  },
  greetingBold: {
    fontFamily: FONTS.titleBold,
    fontWeight: '700',
    color: COLORS.heading,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.body,
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: '400',
    marginTop: -2,
  },
});
