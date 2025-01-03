'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'all',
    'clothes',
    'electronics',
    'furniture',
    'shoes',
    'miscellaneous',
  ]

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-24 bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  className={`w-full text-left px-2 py-1 rounded ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

