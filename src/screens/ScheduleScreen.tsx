import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  ImageSourcePropType,
  Animated,
  Dimensions,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Background, CategoryCard } from '../components';
import { COLORS, FONTS } from '../theme';

const CATEGORIES = [
  { id: '1', name: 'Ranqueada', icon: require('../../assets/ranqueada.png') },
  { id: '2', name: 'Duelo 1x1', icon: require('../../assets/duelo.png') },
  { id: '3', name: 'Diversão', icon: require('../../assets/diversao.png') },
];

interface ServerData {
  id: string;
  name: string;
  role: string;
  icon: ImageSourcePropType;
}

const SERVERS: ServerData[] = [
  { id: '1', name: 'Rumo ao topo', role: 'Administrador', icon: require('../../assets/csgo.png') },
  { id: '2', name: 'Bora queimar tudo', role: 'Convidado', icon: require('../../assets/apex.png') },
  { id: '3', name: 'Yeah, Boy', role: 'Convidado', icon: require('../../assets/reddead.png') },
  { id: '4', name: 'Valorosos', role: 'Convidado', icon: require('../../assets/valorant.png') },
  { id: '5', name: 'Rolezão Monstro', role: 'Convidado', icon: require('../../assets/gta.png') },
  { id: '6', name: 'Construtores', role: 'Convidado', icon: require('../../assets/minecraft.png') },
  { id: '7', name: 'Battle Insane', role: 'Convidado', icon: require('../../assets/battlefield.png') },
  { id: '8', name: 'Lendários', role: 'Administrador', icon: require('../../assets/lol.png') },
];

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;
const SWIPE_THRESHOLD = 150;

interface ScheduleScreenProps {
  onGoBack?: () => void;
}

const ScheduleScreen = ({ onGoBack }: ScheduleScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  const [showServerModal, setShowServerModal] = useState(false);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  // Animated value for the modal slide position
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const openModal = useCallback(() => {
    setShowServerModal(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [translateY]);

  const closeModal = useCallback(() => {
    Animated.timing(translateY, {
      toValue: MODAL_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowServerModal(false);
    });
  }, [translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture vertical downward drags
        return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD || gestureState.vy > 0.5) {
          closeModal();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
          }).start();
        }
      },
    })
  ).current;

  const handleSelectServer = (server: ServerData) => {
    setSelectedServer(server);
    closeModal();
  };

  const isFormComplete = selectedCategory && selectedServer && day && month && hour && minute;

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
        <Text style={styles.headerTitle}>Agendar partida</Text>
        {/* Spacer to center the title */}
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
          onPress={openModal}
        >
          <LinearGradient
            colors={['#1D2766', '#171F52']}
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
          {/* Data completa DD/MM */}
          <LinearGradient
            colors={['#1D2766', '#171F52']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.dateInputWrapper}
          >
            <TextInput
              style={styles.dateInputField}
              value={day}
              onChangeText={(t) => setDay(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="DD"
              placeholderTextColor={COLORS.body}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.dateSeparatorInline}>/</Text>
            <TextInput
              style={styles.dateInputField}
              value={month}
              onChangeText={(t) => setMonth(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="MM"
              placeholderTextColor={COLORS.body}
              keyboardType="number-pad"
              maxLength={2}
            />
          </LinearGradient>

          {/* Spacer entre data e hora */}
          <View style={styles.dateTimeSpacer} />

          {/* Hora */}
          <LinearGradient
            colors={['#1D2766', '#171F52']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.timeInputWrapper}
          >
            <TextInput
              style={styles.timeInputField}
              value={hour}
              onChangeText={(t) => setHour(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="HH"
              placeholderTextColor={COLORS.body}
              keyboardType="number-pad"
              maxLength={2}
            />
          </LinearGradient>
          <Text style={styles.separator}>:</Text>
          {/* Minuto */}
          <LinearGradient
            colors={['#1D2766', '#171F52']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.timeInputWrapper}
          >
            <TextInput
              style={styles.timeInputField}
              value={minute}
              onChangeText={(t) => setMinute(t.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="MM"
              placeholderTextColor={COLORS.body}
              keyboardType="number-pad"
              maxLength={2}
            />
          </LinearGradient>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionHeader}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.charLimit}>Max 100 caracteres</Text>
        </View>
        <LinearGradient
          colors={['#1D2766', '#171F52']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.descriptionGradient}
        >
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={(t) => setDescription(t.slice(0, 100))}
            placeholder="Escreva uma descrição..."
            placeholderTextColor={COLORS.body}
            multiline
            maxLength={100}
            textAlignVertical="top"
          />
        </LinearGradient>

        {/* Botão Agendar */}
        <Pressable
          style={[styles.submitButton, !isFormComplete && styles.submitButtonDisabled]}
        >
          <Text style={styles.submitButtonText}>Agendar</Text>
        </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Server Selection Modal */}
      {showServerModal && (
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalOverlayPress}
            onPress={closeModal}
          />
          <Animated.View
            style={[
              styles.modalAnimatedContainer,
              { transform: [{ translateY }] },
            ]}
            {...panResponder.panHandlers}
          >
            <LinearGradient
              colors={['#0A1033', '#0E1647']}
              style={styles.modalContainer}
            >
              {/* Handle bar */}
              <View style={styles.modalHandleWrapper}>
                <View style={styles.modalHandle} />
              </View>

              {/* Server list */}
              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                {SERVERS.map((server, index) => (
                  <Pressable
                    key={server.id}
                    style={styles.serverItem}
                    onPress={() => handleSelectServer(server)}
                  >
                    <Image
                      source={server.icon}
                      style={styles.serverItemIcon}
                      resizeMode="cover"
                    />
                    <View style={styles.serverItemInfo}>
                      <Text style={styles.serverItemName}>{server.name}</Text>
                      <Text style={styles.serverItemRole}>{server.role}</Text>
                    </View>
                    <Text style={styles.serverItemArrow}>›</Text>
                    {index < SERVERS.length - 1 && (
                      <View style={styles.serverItemDivider} />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            </LinearGradient>
          </Animated.View>
        </View>
      )}
    </Background>
  );
};

export default ScheduleScreen;

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
  headerSpacer: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
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

  /* Servidor */
  serverSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    marginBottom: 28,
    overflow: 'hidden',
  },
  serverIconArea: {
    width: 64,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  serverIconImage: {
    width: 64,
    height: 68,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
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

  /* Data e Hora */
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
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 152,
    height: 48,
    borderRadius: 8,
  },
  dateInputField: {
    width: 40,
    height: 48,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.heading,
  },
  dateSeparatorInline: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.body,
    marginHorizontal: 2,
  },
  timeInputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 48,
    borderRadius: 8,
  },
  timeInputField: {
    width: 72,
    height: 48,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.heading,
  },
  separator: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.body,
    marginHorizontal: 4,
  },
  dateTimeSpacer: {
    flex: 1,
  },

  /* Descrição */
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
  descriptionGradient: {
    height: 95,
    borderRadius: 8,
    marginBottom: 32,
  },
  descriptionInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.heading,
  },

  /* Botão Agendar */
  submitButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
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

  /* Modal */
  modalOverlay: {
    ...StyleSheet.absoluteFill as any,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  modalOverlayPress: {
    flex: 1,
  },
  modalAnimatedContainer: {
    height: '90%',
  },
  modalContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
  },
  modalHandleWrapper: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  modalHandle: {
    width: 39,
    height: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  modalScroll: {
    flex: 1,
    paddingHorizontal: 24,
  },
  serverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    marginBottom: 24,
  },
  serverItemIcon: {
    width: 64,
    height: 68,
    borderRadius: 8,
  },
  serverItemInfo: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1D2766',
  },
  serverItemName: {
    fontFamily: FONTS.titleBold,
    fontSize: 18,
    lineHeight: 23,
    color: COLORS.heading,
    marginBottom: 2,
  },
  serverItemRole: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 17,
    color: COLORS.body,
  },
  serverItemArrow: {
    fontFamily: FONTS.medium,
    fontSize: 22,
    color: COLORS.body,
    marginLeft: 8,
    alignSelf: 'center',
  },
  serverItemDivider: {
    position: 'absolute',
    bottom: 0,
    left: 84,
    right: 0,
    height: 1,
    backgroundColor: '#1D2766',
  },
});
