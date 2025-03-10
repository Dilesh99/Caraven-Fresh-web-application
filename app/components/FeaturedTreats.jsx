import Image from 'next/image'
import { Card, CardContent } from '../components/ui/card'

const featuredTreats = [
  { name: 'Birthday Cake', description: 'Customizable celebration cake', image: '/fav/bdaycake.jpg' },
  { name: 'Macarons', description: 'Assorted flavors', image: '/fav/maca.jpg' },
  { name: 'Fruit Tart', description: 'Fresh seasonal fruits', image: '/fav/tart_s.jpg' },
]

export default function FeaturedTreats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Treats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredTreats.map((treat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Image src={treat.image} alt={treat.name} width={300} height={300} className="rounded-lg mb-4 w-full" />
                <h3 className="text-xl font-semibold mb-2">{treat.name}</h3>
                <p className="text-gray-600">{treat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

