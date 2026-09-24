import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Dimensions,
  PanResponder,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServerCard from './ServerCard';
import { ServerData, SERVERS } from '../mocks';
import { COLORS, LAYOUT } from '../theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;
const SWIPE_THRESHOLD = 150;

interface ModalServerSelectProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (server: ServerData) => void;
  servers?: ServerData[];
}

const ModalServerSelect = ({
  visible,
  onClose,
  onSelect,
  servers = SERVERS,
}: ModalServerSelectProps) => {
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(MODAL_HEIGHT);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    }
  }, [visible, translateY]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: MODAL_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD || gestureState.vy > 0.5) {
          handleClose();
        } else {
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

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.overlayPress} onPress={handleClose} />
      <Animated.View
        style={[styles.animatedContainer, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={[COLORS.modalGradient[0], COLORS.modalGradient[1]]}
          style={styles.container}
        >
          {/* Handle bar */}
          <View style={styles.handleWrapper}>
            <View style={styles.handle} />
          </View>

          {/* Server list */}
          <FlatList
            data={servers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ServerCard
                server={item}
                onPress={() => {
                  onSelect(item);
                  handleClose();
                }}
              />
            )}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default ModalServerSelect;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.modalOverlay,
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  overlayPress: {
    flex: 1,
  },
  animatedContainer: {
    height: '90%',
  },
  container: {
    flex: 1,
    borderTopLeftRadius: LAYOUT.modalBorderRadius,
    borderTopRightRadius: LAYOUT.modalBorderRadius,
    paddingTop: 12,
  },
  handleWrapper: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  handle: {
    width: 39,
    height: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: LAYOUT.horizontalPadding,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
