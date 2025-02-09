'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const topProducts = [
  { name: 'Chocolate Cake', price: '$25', image: '/choc.jpg' },
  { name: 'Strawberry Tart', price: '$15', image: '/tart.jpg' },
  { name: 'Blueberry Muffin', price: '$5', image: '/muffin.jpg' },
  { name: 'Apple Pie', price: '$20', image: '/pie.jpg' },
  { name: 'Croissant', price: '$3', image: '/Croissant.jpg' },
  { name: 'dsfgdsf', price: '$15', image: '/tart.jpg' }
]

export default function TopProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (topProducts.length/3))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + topProducts.length) % (topProducts.length/3))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Top Products</h2>
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" onClick={prevSlide}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" onClick={nextSlide}>
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {topProducts.map((product, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <Card>
                    <CardContent className="p-4">
                      <Image src={product.image} alt={product.name} width={500} height={300} className="rounded-lg mb-4 mx-auto" />
                      <h3 className="text-xl font-semibold text-center">{product.name}</h3>
                      <p className="text-primary text-center">{product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}