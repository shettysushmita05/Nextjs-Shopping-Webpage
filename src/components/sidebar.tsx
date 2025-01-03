'use client'

import { useAppDispatch, useAppSelector } from '@/store/store'
import { setCategory, setSearchQuery, setPriceRange, applyFilters } from '@/store/productSlice'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

const categories = [
  'All',
  'Electronics',
  'Clothes',
  'Furniture',
  'Shoes',
  'Others',
]

export function Sidebar() {
  const dispatch = useAppDispatch()
  const { category, searchQuery, priceRange } = useAppSelector(state => state.product)

  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory))
    dispatch(applyFilters())
  }

  const handleSearchChange = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery))
    dispatch(applyFilters())
  }

  const handlePriceRangeChange = (newRange: number[]) => {
    dispatch(setPriceRange(newRange as [number, number]))
    dispatch(applyFilters())
  }

  return (
    <aside className="w-full md:w-64 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded ${
                  category === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Label htmlFor="search">Search Products</Label>
        <Input
          id="search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  )
}

