import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Avatar from './Avatar';
import { PlayerData } from '../mocks';
import { COLORS, FONTS } from '../theme';

interface PlayerCardProps {
  player: PlayerData;
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  const isAvailable = player.status === 'Disponível';

  return (
    <View style={styles.container}>
      <Avatar urlImage={player.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAvailable ? COLORS.visitor : COLORS.primary },
            ]}
          />
          <Text style={styles.status}>{player.status}</Text>
        </View>
      </View>
    </View>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  status: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
  },
});
