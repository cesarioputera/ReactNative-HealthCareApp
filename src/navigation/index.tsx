import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen, LoginScreen, RegisterScreen, DashboardScreen, DoctorListScreen, ClinicListScreen } from '../screens';
import { ScreenMap } from './router';


import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../components/Theme';
import DoctorDetailScreen from '../screens/DoctorDetailScreen';

const AppContainer = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenMap.Splash}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenMap.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenMap.Register}
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenMap.Dashboard}
          component={DashboardScreen}
          options={{
            headerShown: true, title: 'Health Care', headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.onSecondary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name={ScreenMap.ClinicList}
          component={ClinicListScreen}
          options={{
            headerShown: true, title: 'Choose nearby clinic', headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.onSecondary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name={ScreenMap.DoctorList}
          component={DoctorListScreen}
          options={{
            headerShown: true, title: 'Choose doctor', headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.onSecondary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name={ScreenMap.DoctorDetail}
          component={DoctorDetailScreen}
          options={{
            headerShown: true, title: '', headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.onSecondary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;