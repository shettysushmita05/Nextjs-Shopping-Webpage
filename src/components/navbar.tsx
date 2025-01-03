"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, ShoppingCart, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/store'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const cartItems = useAppSelector(state => state.cart.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Shop
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/store" className="hover:text-primary">
              Store
            </Link>
            <Link href="/cart" className="hover:text-primary relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

