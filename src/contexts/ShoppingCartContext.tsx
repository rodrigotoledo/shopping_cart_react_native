// src/contexts/ShoppingCartContext.tsx
import { createContext, useContext, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/httpClient'
import { ShoppingCart } from '../types';

type ShoppingCartContextData = {
  allCarts: ShoppingCart[] | undefined
  pendingCarts: ShoppingCart[] | undefined
  paidCarts: ShoppingCart[] | undefined
  isLoading: boolean
  error: Error | null,
  refetch: () => Promise<unknown>
}

const ShoppingCartContext = createContext<ShoppingCartContextData | undefined>(undefined)

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: allCarts,
    isLoading,
    error,
    refetch
  } = useQuery<ShoppingCart[]>({
    queryKey: ['shoppingCarts'],
    queryFn: async () => {
      const { data } = await apiClient.get('/shopping_carts')
      return data
    },
    refetchInterval: 3000,
    staleTime: 1000,
  })

  const pendingCarts = useMemo(
    () => allCarts?.filter(cart => cart.status === 'pending'),
    [allCarts]
  )

  const paidCarts = useMemo(
    () => allCarts?.filter(cart => cart.status === 'paid'),
    [allCarts]
  )

  return (
    <ShoppingCartContext.Provider
      value={{
        allCarts,
        pendingCarts,
        paidCarts,
        isLoading,
        error,
        refetch
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext)
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider')
  }
  return context
}
