export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  offset: number
  limit: number
  total: number
}

