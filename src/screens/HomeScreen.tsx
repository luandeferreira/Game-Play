import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, Profile, MatchCard, ExitModal, ListHeader, CategorySelect } from '../components';
import { MATCHES, MatchData } from '../mocks';
import { AppNavigationProp } from '../routes/types';
import { LAYOUT } from '../theme';

interface HomeScreenProps {
  onNavigateToSchedule?: () => void;
  onNavigateToServerDetails?: () => void;
}

const HomeScreen = ({
  onNavigateToSchedule,
  onNavigateToServerDetails,
}: HomeScreenProps) => {
  const navigation = useNavigation<AppNavigationProp>();
  const [showExitModal, setShowExitModal] = useState(false);

  // Interceptar o botão "voltar" do Android para exibir o modal de saída
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowExitModal(true);
      return true; // Impede o comportamento padrão
    });
    return () => backHandler.remove();
  }, []);

  const handleNavigateToSchedule = () => {
    if (onNavigateToSchedule) {
      onNavigateToSchedule();
    } else {
      navigation.navigate('Schedule');
    }
  };

  const handleMatchPress = (matchId: string) => {
    // Navegar para detalhes do servidor "Lendários"
    if (matchId === '1') {
      if (onNavigateToServerDetails) {
        onNavigateToServerDetails();
      } else {
        navigation.navigate('ServerDetails');
      }
    }
  };

  const renderHeader = () => (
    <View>
      {/* Header - Perfil */}
      <Profile
        avatar={require('../../assets/tiagofoto.png')}
        name="Tiago"
        subtitle="Hoje é dia de vitória"
        onAddPress={handleNavigateToSchedule}
      />

      {/* Categorias */}
      <CategorySelect hasPadding style={{ marginBottom: 32 }} />

      {/* Seção de Partidas */}
      <ListHeader
        title="Partidas agendadas"
        subtitle={`Total ${MATCHES.length}`}
      />
    </View>
  );

  return (
    <Background>
      <FlatList
        data={MATCHES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchItemContainer}>
            <MatchCard
              match={item}
              onPress={() => handleMatchPress(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de confirmação de saída */}
      <ExitModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={() => BackHandler.exitApp()}
      />
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 40,
  },
  matchItemContainer: {
    paddingHorizontal: LAYOUT.horizontalPadding,
  },
});
