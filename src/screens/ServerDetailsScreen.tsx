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
import { Background, Header, ListHeader, PlayerCard, ButtonIcon, ServerBanner } from '../components';
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
      {/* Banner */}
      <ServerBanner
        image={require('../../assets/lol-fundo.png')}
        title="Lendários"
        description="É hoje que vamos chegar ao challenger sem perder uma partida da md10"
      />

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

  /* Banner (Estilos removidos pois agora usa o componente ServerBanner) */

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
