import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import PendingCartsScreen from '../screens/PendingCartsScreen';
import PaidCartsScreen from '../screens/PaidCartsScreen';
import DashboardScreen from '../screens/DashboardScreen';

type MainNavigatorParams = {
  Dashboard: undefined;
  PendingCarts: undefined;
  PaidCarts: undefined;
};

const Top = createMaterialTopTabNavigator<MainNavigatorParams>();

export const MainNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Top.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          height: 1,
        },
      }}
    >
      <Top.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Top.Screen
        name="PendingCarts"
        component={PendingCartsScreen}
        options={{ title: 'Pending Carts' }}
      />
      <Top.Screen
        name="PaidCarts"
        component={PaidCartsScreen}
        options={{ title: 'Paids' }}
      />
    </Top.Navigator>
  );
};
