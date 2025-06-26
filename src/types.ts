export type ShoppingCartItem = {
  id: number
  product: string
  quantity: number
  price: number
}

export type ShoppingCart = {
  id: number
  customer: string
  status: 'pending' | 'paid'
  created_at: string
  updated_at: string
  shopping_cart_items: ShoppingCartItem[]
}

export type ShoppingCartStatus = 'pending' | 'paid'