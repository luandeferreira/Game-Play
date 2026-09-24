import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import {
  SplashScreen,
  LoginScreen,
  HomeScreen,
  ScheduleScreen,
  ServerDetailsScreen,
} from '../screens';
import { COLORS } from '../theme';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes = () => {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: COLORS.backgroundDark,
        },
      }}
    >
      <Screen name="Splash" component={SplashScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Schedule" component={ScheduleScreen} />
      <Screen name="ServerDetails" component={ServerDetailsScreen} />
    </Navigator>
  );
};
