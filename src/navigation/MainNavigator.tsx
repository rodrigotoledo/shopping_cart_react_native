import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import { ShoppingCartsScreen } from '../screens/ShoppingCartsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { MainNavigatorParams } from '../types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainNavigatorParams {}
  }
}

const Top = createMaterialTopTabNavigator<MainNavigatorParams>();

export const MainNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Top.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onSurfaceVariant,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.surface,
          height: 2,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primaryContainer, // Fundo mais escuro
        },
        tabBarPressColor: theme.colors.primaryContainer,
        tabBarLabelStyle: {
          fontWeight: 'bold',
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
        component={ShoppingCartsScreen}
        options={{ title: 'Pending Carts' }}
        initialParams={{ status: 'pending' }}
      />
      <Top.Screen
        name="PaidCarts"
        component={ShoppingCartsScreen}
        options={{ title: 'Paids' }}
        initialParams={{ status: 'paid' }}
      />
    </Top.Navigator>
  );
};
