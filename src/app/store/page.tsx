'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setProducts, applyFilters } from '@/store/productSlice'
import { addToCart } from '@/store/cartSlice'
import { Button } from '@/components/ui/button'

export default function StorePage() {
  const dispatch = useAppDispatch()
  const { filteredProducts } = useAppSelector(state => state.product)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await response.json()
        dispatch(setProducts(data))
        dispatch(applyFilters())
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-card text-card-foreground rounded-lg shadow overflow-hidden">
          <div className="relative h-48">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold mb-2 line-clamp-1">{product.title}</h2>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold">${product.price}</span>
              <Button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                      quantity: 1,
                    })
                  )
                }
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

