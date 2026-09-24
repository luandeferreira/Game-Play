import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Background, Header, ListHeader, PlayerCard, ButtonIcon } from '../components';
import { PLAYERS } from '../mocks';
import { AppNavigationProp } from '../routes/types';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface ServerDetailsScreenProps {
  onGoBack?: () => void;
}

const ServerDetailsScreen = ({ onGoBack }: ServerDetailsScreenProps) => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  const renderHeader = () => (
    <View>
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

      {/* Cabeçalho da seção de Jogadores */}
      <ListHeader title="Jogadores" subtitle={`Total ${PLAYERS.length}`} />
    </View>
  );

  const shareAction = (
    <Pressable style={styles.shareButton}>
      <Image
        source={require('../../assets/compartilhar.png')}
        style={styles.shareIcon}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <Background>
      {/* Header com gradiente, botão voltar, título e ação de compartilhar */}
      <Header
        title="Detalhes"
        onGoBack={handleGoBack}
        action={shareAction}
      />

      <FlatList
        data={PLAYERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItemContainer}>
            <PlayerCard player={item} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.playerDivider} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: LAYOUT.buttonHeight + (insets.bottom > 0 ? insets.bottom + 48 : 56) },
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão Entrar na Partida */}
      <View
        style={[
          styles.bottomButtonContainer,
          { bottom: insets.bottom > 0 ? insets.bottom + 16 : 32 },
        ]}
      >
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
};

export default ServerDetailsScreen;

const styles = StyleSheet.create({
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
    ...StyleSheet.absoluteFill,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: LAYOUT.horizontalPadding,
    right: LAYOUT.horizontalPadding,
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
  playerItemContainer: {
    paddingHorizontal: LAYOUT.horizontalPadding,
  },
  playerDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 88,
  },

  /* Botão Entrar */
  bottomButtonContainer: {
    position: 'absolute',
    left: LAYOUT.horizontalPadding,
    right: LAYOUT.horizontalPadding,
  },
});
