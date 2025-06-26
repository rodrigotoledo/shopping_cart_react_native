import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { ScreenContainer } from '../components/ScreenContainer';
import { MainNavigatorParams, ShoppingCart, ShoppingCartStatus } from '../types';
import { ActivityIndicator } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ShoppingCartsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParams,
  'PendingCarts' | 'PaidCarts'
>;

type ShoppingCartsScreenRouteProp = RouteProp<
  MainNavigatorParams,
  'PendingCarts' | 'PaidCarts'
>;

interface ShoppingCartsScreenProps {
  navigation: ShoppingCartsScreenNavigationProp;
  route: ShoppingCartsScreenRouteProp;
}

export const ShoppingCartsScreen: React.FC<ShoppingCartsScreenProps> = ({
  route,
}) => {
  const { status } = route.params;
  const { pendingCarts, paidCarts, isLoading, error } = useShoppingCart();

  const carts = status === 'pending' ? pendingCarts : paidCarts;
  const title = status === 'paid' ? 'Paid Carts' : 'Pending Carts';
  const emptyMessage = status === 'pending'
    ? 'No pending shopping carts available'
    : 'No paid shopping carts available';

  if (isLoading) return <ActivityIndicator style={styles.loader} />;
  if (error) return (
    <View className="p-4 bg-orange-300">
      <Text className="text-white">Error: {error.message}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <View className="mb-8">
        <Text className="text-3xl font-bold text-white">{title}</Text>
        <Text className="text-gray-300">List of {status} shopping carts</Text>
      </View>

      {carts?.length === 0 ? (
        <View className="bg-gray-800 rounded-lg p-8 items-center justify-center">
          <Text className="text-xl text-gray-400">{emptyMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={carts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ShoppingCartListItem cart={item} status={status} />}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </ScreenContainer>
  );
};

const ShoppingCartListItem = ({
  cart,
  status
}: {
  cart: ShoppingCart,
  status: ShoppingCartStatus
}) => {
  const total = cart.shopping_cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const createdAt = new Date(cart.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <TouchableOpacity
      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
      activeOpacity={0.8}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-xl font-semibold text-white">{cart.customer}</Text>
          <Text className="text-gray-400 text-sm">{createdAt}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          <Text className="text-xs font-medium text-white">{status}</Text>
        </View>
      </View>

      <View className="mt-3 border-t border-gray-700 pt-3">
        <Text className="font-medium text-gray-300 mb-2">Items ({cart.shopping_cart_items.length}):</Text>
        <View>
          {cart.shopping_cart_items.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between bg-gray-900/50 p-2 rounded mb-2"
            >
              <Text className="text-gray-300">
                {item.quantity}x <Text className="font-medium">{item.product}</Text>
              </Text>
              <Text className="text-white font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-3 pt-3 border-t border-gray-700 flex-row justify-between items-center">
        <Text className="font-medium text-gray-300">Total:</Text>
        <Text className="text-lg font-bold text-white">${total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
});
