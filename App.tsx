import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Play 🎮</Text>
      <Text style={styles.subtitle}>
        Projeto configurado e pronto para rodar no Expo Go!
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          🚀 Edite <Text style={styles.code}>App.tsx</Text> para começar a construir seu aplicativo.
        </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1015',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#99AAB5',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1E2129',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2F333D',
  },
  cardText: {
    fontSize: 14,
    color: '#DCDDDE',
    textAlign: 'center',
  },
  code: {
    fontWeight: 'bold',
    color: '#7289DA',
  },
});

