import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../theme';

interface ExitModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitModal = ({ visible, onClose, onConfirm }: ExitModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <LinearGradient
        colors={[COLORS.backgroundLight, COLORS.backgroundDark]}
        style={styles.container}
      >
        <Text style={styles.title}>
          Deseja sair do Game<Text style={styles.titleAccent}>Play</Text>?
        </Text>
        <View style={styles.buttonsRow}>
          <Pressable style={styles.buttonNo} onPress={onClose}>
            <Text style={styles.buttonNoText}>Não</Text>
          </Pressable>
          <Pressable style={styles.buttonYes} onPress={onConfirm}>
            <Text style={styles.buttonYesText}>Sim</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  </Modal>
);

export default ExitModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontFamily: FONTS.titleBold,
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: COLORS.heading,
    marginBottom: 20,
  },
  titleAccent: {
    color: COLORS.primary,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonNo: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNoText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: COLORS.heading,
  },
  buttonYes: {
    flex: 1,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonYesText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: COLORS.heading,
  },
});
