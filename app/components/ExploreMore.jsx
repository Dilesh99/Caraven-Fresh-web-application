'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Card, CardContent, CardFooter } from '../components/ui/card'
import Image from 'next/image'
import { useCart } from '../components/context/CartContext'
import { Button } from '../components/ui/button'

const categories = ['Cakes', 'Pastries', 'Cookies', 'Breads']

const products = {
  Cakes: [
    { name: 'Chocolate Cake', price: '$25', image: '/cakes/choc_cake.jpg' },
    { name: 'Vanilla Cake', price: '$22', image: '/cakes/van_cake.jpg' },
    { name: 'Red Velvet Cake', price: '$28', image: '/cakes/red_cake.jpg' },
    { name: 'Carrot Cake', price: '$24', image: '/cakes/Carrot_cake.jpg' },
  ],
  Pastries: [
    { name: 'Croissant', price: '$3', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Danish', price: '$4', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Eclair', price: '$5', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Fruit Tart', price: '$6', image: '/placeholder.svg?height=200&width=200' },
  ],
  Cookies: [
    { name: 'Chocolate Chip', price: '$2', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Oatmeal Raisin', price: '$2', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Peanut Butter', price: '$2.5', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Sugar Cookie', price: '$2', image: '/placeholder.svg?height=200&width=200' },
  ],
  Breads: [
    { name: 'Sourdough', price: '$5', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Baguette', price: '$4', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Whole Wheat', price: '$4.5', image: '/placeholder.svg?height=200&width=200' },
    { name: 'Rye Bread', price: '$5', image: '/placeholder.svg?height=200&width=200' },
  ],
}

export default function ExploreMore() {
  const [activeCategory, setActiveCategory] = useState('Cakes');
  const { addToCart } = useCart();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore More</h2>
        <Tabs defaultValue="Cakes" className="w-full">
          <TabsList className="w-full justify-start mb-8 overflow-x-auto flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products[category].map((product, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <Image src={product.image} alt={product.name} width={300} height={280} className="rounded-lg mb-4 mx-auto" />
                      <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                      <p className="text-primary text-center">{product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

