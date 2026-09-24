import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Schedule: undefined;
  ServerDetails: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ScheduleScreenProps = NativeStackScreenProps<RootStackParamList, 'Schedule'>;
export type ServerDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ServerDetails'>;
