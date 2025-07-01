// src/contexts/ShoppingCartContext.tsx
import { createContext, useContext, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../api/httpClient'
import { ShoppingCart } from '../types';

type ShoppingCartContextData = {
  allCarts: ShoppingCart[] | undefined
  pendingCarts: ShoppingCart[] | undefined
  paidCarts: ShoppingCart[] | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<unknown>
  payCart: (cartId: number) => Promise<void>
  isPaying: boolean
  payError: Error | null
}

const ShoppingCartContext = createContext<ShoppingCartContextData | undefined>(undefined)

export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
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

  const {
    mutateAsync: payCart,
    isPending: isPaying,  // <<-- Aqui está a correção crucial
    error: payError
  } = useMutation<void, Error, number>({
    mutationFn: async (cartId: number) => {
      await apiClient.put(`/shopping_carts/${cartId}/pay`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingCarts'], exact: true })
    }
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
        refetch,
        payCart,
        isPaying,
        payError
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
