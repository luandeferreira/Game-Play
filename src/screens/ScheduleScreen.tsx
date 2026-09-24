import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  Background,
  CategoryCard,
  Header,
  DateInput,
  SmallInput,
  TextArea,
  ModalServerSelect,
} from '../components';
import { CATEGORIES, ServerData } from '../mocks';
import { AppNavigationProp } from '../routes/types';
import { COLORS, FONTS, LAYOUT } from '../theme';

interface ScheduleScreenProps {
  onGoBack?: () => void;
}

const ScheduleScreen = ({ onGoBack }: ScheduleScreenProps) => {
  const navigation = useNavigation<AppNavigationProp>();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  const [showServerModal, setShowServerModal] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  const isFormComplete = Boolean(
    selectedCategory && selectedServer && day && month && hour && minute
  );

  return (
    <Background>
      {/* Header com gradiente, botão voltar e título */}
      <Header title="Agendar partida" onGoBack={handleGoBack} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categoria */}
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.categoriesRow}>
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                icon={cat.icon}
                selected={selectedCategory === cat.id}
                onPress={() => setSelectedCategory(cat.id)}
              />
            ))}
          </View>

          {/* Servidor */}
          <Text style={styles.sectionTitle}>Servidor</Text>
          <Pressable
            style={styles.serverSelector}
            onPress={() => setShowServerModal(true)}
          >
            <LinearGradient
              colors={[COLORS.inputGradient[0], COLORS.inputGradient[1]]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.serverIconArea}
            >
              {selectedServer && (
                <Image
                  source={selectedServer.icon}
                  style={styles.serverIconImage}
                  resizeMode="cover"
                />
              )}
            </LinearGradient>
            <Text style={styles.serverText}>
              {selectedServer ? selectedServer.name : 'Selecione um servidor'}
            </Text>
            <Text style={styles.serverArrow}>›</Text>
          </Pressable>

          {/* Data e Hora */}
          <View style={styles.dateTimeHeader}>
            <Text style={styles.sectionTitle}>Data</Text>
            <Text style={[styles.sectionTitle, styles.dateTimeLabelRight]}>Horário</Text>
          </View>
          <View style={styles.dateTimeRow}>
            {/* Input de Data (DD/MM) */}
            <DateInput
              day={day}
              month={month}
              onChangeDay={setDay}
              onChangeMonth={setMonth}
            />

            <View style={styles.dateTimeSpacer} />

            {/* Inputs de Horário (HH:MM) */}
            <SmallInput
              value={hour}
              onChangeText={(t) => setHour(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="HH"
            />
            <Text style={styles.timeSeparator}>:</Text>
            <SmallInput
              value={minute}
              onChangeText={(t) => setMinute(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="MM"
            />
          </View>

          {/* Descrição */}
          <View style={styles.descriptionHeader}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.charLimit}>Max 100 caracteres</Text>
          </View>
          <TextArea
            value={description}
            onChangeText={(t) => setDescription(t.slice(0, 100))}
            placeholder="Escreva uma descrição..."
          />

          {/* Botão Agendar */}
          <Pressable
            style={[styles.submitButton, !isFormComplete && styles.submitButtonDisabled]}
          >
            <Text style={styles.submitButtonText}>Agendar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Seleção de Servidor */}
      <ModalServerSelect
        visible={showServerModal}
        onClose={() => setShowServerModal(false)}
        onSelect={setSelectedServer}
      />
    </Background>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: LAYOUT.horizontalPadding,
  },
  sectionTitle: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginBottom: 12,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
  },
  serverSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: LAYOUT.cardBorderRadius,
    marginBottom: 28,
    overflow: 'hidden',
  },
  serverIconArea: {
    width: 64,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: LAYOUT.cardBorderRadius,
    borderBottomLeftRadius: LAYOUT.cardBorderRadius,
  },
  serverIconImage: {
    width: 64,
    height: 68,
    borderTopLeftRadius: LAYOUT.cardBorderRadius,
    borderBottomLeftRadius: LAYOUT.cardBorderRadius,
  },
  serverText: {
    flex: 1,
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginLeft: 20,
  },
  serverArrow: {
    fontFamily: FONTS.medium,
    fontSize: 22,
    color: COLORS.body,
    marginRight: 16,
  },
  dateTimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeLabelRight: {
    textAlign: 'right',
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  dateTimeSpacer: {
    flex: 1,
  },
  timeSeparator: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.body,
    marginHorizontal: 4,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  charLimit: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
    textAlign: 'right',
  },
  submitButton: {
    height: LAYOUT.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.cardBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: COLORS.heading,
  },
});
