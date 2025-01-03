'use client'

import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/store'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'

interface CartItemProps {
  item: {
    id: number
    title: string
    price: number
    quantity: number
    image: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              if (item.quantity > 1) {
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
              }
            }}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

