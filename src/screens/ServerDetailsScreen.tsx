import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '../components';
import { COLORS, FONTS } from '../theme';

interface PlayerData {
  id: string;
  name: string;
  status: 'Disponível' | 'Ocupado';
  avatar: any;
}

const PLAYERS: PlayerData[] = [
  { id: '1', name: 'Tiago Luchtenberg', status: 'Disponível', avatar: require('../../assets/tiagopic.png') },
  { id: '2', name: 'Rodrigo Gonçalves', status: 'Ocupado', avatar: require('../../assets/rodrigopic.png') },
  { id: '3', name: 'Diego Fernandes', status: 'Ocupado', avatar: require('../../assets/diegopic.png') },
];

interface ServerDetailsScreenProps {
  onGoBack?: () => void;
}

const ServerDetailsScreen = ({ onGoBack }: ServerDetailsScreenProps) => {
  return (
    <Background>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.cardGradientStart, COLORS.cardGradientEnd]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.header}
      >
        <Pressable style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <Pressable style={styles.shareButton}>
          <Image
            source={require('../../assets/compartilhar.png')}
            style={styles.shareIcon}
            resizeMode="contain"
          />
        </Pressable>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner com imagem de fundo */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../assets/lol-fundo.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(18, 29, 51, 0.61)', 'rgba(18, 29, 51, 0.83)', '#121D33']}
            locations={[0, 0.46, 0.77, 1]}
            style={styles.bannerOverlay}
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.serverName}>Lendários</Text>
            <Text style={styles.serverDescription}>
              É hoje que vamos chegar ao challenger sem perder uma partida da md10
            </Text>
          </View>
        </View>

        {/* Jogadores */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jogadores</Text>
          <Text style={styles.sectionCount}>Total {PLAYERS.length}</Text>
        </View>

        {/* Lista de Jogadores */}
        <View style={styles.playerList}>
          {PLAYERS.map((player, index) => (
            <View key={player.id}>
              <View style={styles.playerItem}>
                <LinearGradient
                  colors={[COLORS.avatarBorderStart, COLORS.avatarBorderEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.playerAvatarBorder}
                >
                  <Image
                    source={player.avatar}
                    style={styles.playerAvatar}
                    resizeMode="cover"
                  />
                </LinearGradient>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <View style={styles.statusRow}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            player.status === 'Disponível'
                              ? COLORS.visitor
                              : COLORS.primary,
                        },
                      ]}
                    />
                    <Text style={styles.playerStatus}>{player.status}</Text>
                  </View>
                </View>
              </View>
              {index < PLAYERS.length - 1 && (
                <View style={styles.playerDivider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botão Entrar na Partida */}
      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.joinButton}>
          <View style={styles.joinIconArea}>
            <Image
              source={require('../../assets/discord.png')}
              style={styles.joinDiscordIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.joinDivider} />
          <View style={styles.joinTextArea}>
            <Text style={styles.joinButtonText}>Entrar na partida</Text>
          </View>
        </Pressable>
      </View>
    </Background>
  );
};

export default ServerDetailsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 22,
    paddingHorizontal: 20,
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
  headerTitle: {
    fontFamily: FONTS.titleBold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: COLORS.heading,
  },
  shareButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  /* Banner */
  bannerContainer: {
    height: 234,
    position: 'relative',
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: 234,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill as any,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    paddingBottom: 16,
  },
  serverName: {
    fontFamily: FONTS.titleBold,
    fontSize: 28,
    lineHeight: 36,
    color: COLORS.heading,
    marginBottom: 8,
  },
  serverDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.heading,
  },

  /* Jogadores */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
  },
  sectionCount: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
    textAlign: 'right',
  },
  playerList: {
    paddingHorizontal: 24,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  playerAvatarBorder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playerName: {
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
  playerStatus: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
  },
  playerDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 64,
  },

  /* Botão Entrar */
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  joinButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  joinIconArea: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinDiscordIcon: {
    width: 24,
    height: 18,
  },
  joinDivider: {
    width: 1,
    height: 56,
    backgroundColor: COLORS.primaryDark,
  },
  joinTextArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.heading,
  },
});
