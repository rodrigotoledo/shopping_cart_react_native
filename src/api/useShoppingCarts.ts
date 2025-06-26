// src/api/useShoppingCarts.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from './httpClient';
import { ShoppingCart } from '../types';

const fetchShoppingCarts = async (): Promise<ShoppingCart[]> => {
  const { data } = await apiClient.get('/shopping_carts');
  return data;
};

export const useShoppingCarts = () => {
  return useQuery({
    queryKey: ['shoppingCarts'],
    queryFn: fetchShoppingCarts,
  });
};