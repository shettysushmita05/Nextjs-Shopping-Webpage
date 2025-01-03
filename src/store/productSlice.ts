import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product'

interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  category: string
  searchQuery: string
  priceRange: [number, number]
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  category: 'All',
  searchQuery: '',
  priceRange: [0, 1000],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    applyFilters: (state) => {
      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory = state.category === 'All' || product.category.name === state.category
        const matchesSearch = product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        const matchesPrice = product.price >= state.priceRange[0] && product.price <= state.priceRange[1]
        return matchesCategory && matchesSearch && matchesPrice
      })
    },
  },
})

export const { setProducts, setCategory, setSearchQuery, setPriceRange, applyFilters } = productSlice.actions
export default productSlice.reducer

