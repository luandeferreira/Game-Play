import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, BackHandler } from 'react-native';
import { Background, Profile, CategoryCard, MatchCard, ExitModal } from '../components';
import { MatchData } from '../components/MatchCard';
import { COLORS, FONTS } from '../theme';

// Dados mock das partidas
const MATCHES: MatchData[] = [
  {
    id: '1',
    name: 'Lendários',
    category: 'Ranqueada',
    date: '18/06 às 21:00h',
    host: 'Anfitrião',
    icon: require('../../assets/lol.png'),
  },
  {
    id: '2',
    name: 'Yeah, boy',
    category: 'Diversão',
    date: '23/06 às 19:00h',
    host: 'Visitante',
    icon: require('../../assets/reddead.png'),
  },
  {
    id: '3',
    name: 'Rumo ao topo',
    category: '1×1',
    date: '20/06 às 09:00h',
    host: 'Anfitrião',
    icon: require('../../assets/csgo.png'),
  },
  {
    id: '4',
    name: 'Bora queimar tudo',
    category: 'Ranqueada',
    date: '20/06 às 14:20h',
    host: 'Anfitrião',
    icon: require('../../assets/apex.png'),
  },
  {
    id: '5',
    name: 'Valorosos',
    category: 'Diversão',
    date: '10/06 às 21:00h',
    host: 'Anfitrião',
    icon: require('../../assets/valorant.png'),
  },
];

const CATEGORIES = [
  { id: '1', name: 'Ranqueada', icon: require('../../assets/ranqueada.png') },
  { id: '2', name: 'Duelo 1x1', icon: require('../../assets/duelo.png') },
  { id: '3', name: 'Diversão', icon: require('../../assets/diversao.png') },
];

interface HomeScreenProps {
  onNavigateToSchedule?: () => void;
  onNavigateToServerDetails?: () => void;
}

const HomeScreen = ({ onNavigateToSchedule, onNavigateToServerDetails }: HomeScreenProps) => {
  const [showExitModal, setShowExitModal] = useState(false);

  // Interceptar o botão "voltar" do Android para exibir o modal de saída
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setShowExitModal(true);
      return true; // Impede o comportamento padrão
    });
    return () => backHandler.remove();
  }, []);

  const handleMatchPress = (matchId: string) => {
    // Navegar para detalhes do servidor "Lendários"
    if (matchId === '1' && onNavigateToServerDetails) {
      onNavigateToServerDetails();
    }
  };

  return (
    <Background>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Perfil */}
        <Profile
          avatar={require('../../assets/tiagofoto.png')}
          name="Tiago"
          subtitle="Hoje é dia de vitória"
          onAddPress={onNavigateToSchedule}
        />

        {/* Categorias */}
        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} name={cat.name} icon={cat.icon} />
          ))}
        </View>

        {/* Seção de Partidas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Partidas agendadas</Text>
          <Text style={styles.sectionCount}>Total {MATCHES.length}</Text>
        </View>

        {/* Lista de Partidas */}
        <View style={styles.matchList}>
          {MATCHES.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onPress={() => handleMatchPress(match.id)}
            />
          ))}
        </View>
      </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 40,
  },
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 32,
  },
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
    color: COLORS.heading,
  },
  sectionCount: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.body,
  },
  matchList: {
    paddingHorizontal: 24,
  },
});
