import React from 'react';
import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, LAYOUT } from '../theme';
import { ServerData } from '../mocks';

interface ServerSelectorProps {
  selectedServer: ServerData | null;
  onPress: () => void;
}

const ServerSelector = ({ selectedServer, onPress }: ServerSelectorProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.inputGradient[0], COLORS.inputGradient[1]]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.iconArea}
      >
        {selectedServer && (
          <Image
            source={selectedServer.icon}
            style={styles.iconImage}
            resizeMode="cover"
          />
        )}
      </LinearGradient>
      <Text style={styles.text}>
        {selectedServer ? selectedServer.name : 'Selecione um servidor'}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
};

export default ServerSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: LAYOUT.cardBorderRadius,
    overflow: 'hidden',
  },
  iconArea: {
    width: 64,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: LAYOUT.cardBorderRadius,
    borderBottomLeftRadius: LAYOUT.cardBorderRadius,
  },
  iconImage: {
    width: 64,
    height: 68,
    borderTopLeftRadius: LAYOUT.cardBorderRadius,
    borderBottomLeftRadius: LAYOUT.cardBorderRadius,
  },
  text: {
    flex: 1,
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginLeft: 20,
  },
  arrow: {
    fontFamily: FONTS.medium,
    fontSize: 22,
    color: COLORS.body,
    marginRight: 16,
  },
});
