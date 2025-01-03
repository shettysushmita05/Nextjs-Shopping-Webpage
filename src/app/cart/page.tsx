'use client'

import { useAppSelector, useAppDispatch } from '@/store/store'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const cartItems = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some items to your cart to see them here.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
            <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-md" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="destructive" size="icon" onClick={() => dispatch(removeFromCart(item.id))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
        <Button size="lg">Checkout</Button>
      </div>
    </div>
  )
}

