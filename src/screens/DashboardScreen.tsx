import React from 'react'
import { View, Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer'
import { useShoppingCart } from '../contexts/ShoppingCartContext'
import { DarkTheme, useNavigation } from '@react-navigation/native';

import StatusCard from '../components/StatusCard'


import { ActivityIndicator } from 'react-native-paper';

const DashboardScreen = () => {

  const { pendingCarts, paidCarts, isLoading, error } = useShoppingCart();
  const navigation = useNavigation();

  if (isLoading) return <ActivityIndicator color={DarkTheme.colors.background} />;
  if (error) return (
    <View className="p-4 bg-orange-300">
      <Text className="text-white">Error: {error.message}</Text>
    </View>
  );


  return (
    <ScreenContainer>
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold text-white">Shopping Carts Dashboard</Text>
        <Text className="text-gray-300">Overview of shopping carts by status</Text>
      </View>

      <View className="flex-1 justify-center">
        <View className="flex-row justify-center flex-wrap" style={{ gap: 24 }}>
          <StatusCard
            title="Pending Carts"
            count={pendingCarts?.length || 0}
            onPress={() => navigation.navigate('PendingCarts')}
            className="bg-yellow-600"
          />

          <StatusCard
            title="Paid Carts"
            count={paidCarts?.length || 0}
            onPress={() => navigation.navigate('PaidCarts')}
            className="bg-green-600"
          />
        </View>
      </View>
    </ScreenContainer>
  )
}

export default DashboardScreen
