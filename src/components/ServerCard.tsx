import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ServerData } from '../mocks';
import { COLORS, FONTS } from '../theme';

interface ServerCardProps {
  server: ServerData;
  onPress: () => void;
}

const ServerCard = ({ server, onPress }: ServerCardProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={server.icon} style={styles.icon} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{server.name}</Text>
        <Text style={styles.role}>{server.role}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
};

export default ServerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    marginBottom: 24,
  },
  icon: {
    width: 64,
    height: 68,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBackground,
  },
  name: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginBottom: 2,
  },
  role: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
  },
  arrow: {
    fontFamily: FONTS.medium,
    fontSize: 22,
    color: COLORS.body,
    marginLeft: 8,
    alignSelf: 'center',
  },
});
