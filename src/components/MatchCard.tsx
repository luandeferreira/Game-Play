import React from 'react';
import { StyleSheet, View, Image, Text, Pressable, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../theme';

export interface MatchData {
  id: string;
  name: string;
  category: string;
  date: string;
  host: 'Anfitrião' | 'Visitante';
  icon: ImageSourcePropType;
}

interface MatchCardProps {
  match: MatchData;
  onPress?: () => void;
}

const MatchCard = ({ match, onPress }: MatchCardProps) => (
  <Pressable style={styles.card} onPress={onPress}>
    <Image source={match.icon} style={styles.icon} resizeMode="cover" />
    <View style={styles.info}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{match.name}</Text>
        <Text style={styles.category}>{match.category}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.dateRow}>
          <Text style={styles.calendarIcon}>📅</Text>
          <Text style={styles.date}>{match.date}</Text>
        </View>
        <View style={styles.hostRow}>
          <Text style={styles.hostIcon}>👤</Text>
          <Text
            style={[
              styles.host,
              { color: match.host === 'Anfitrião' ? COLORS.host : COLORS.visitor },
            ]}
          >
            {match.host}
          </Text>
        </View>
      </View>
    </View>
  </Pressable>
);

export default MatchCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    color: COLORS.heading,
  },
  category: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.body,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  date: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.body,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  host: {
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
});
