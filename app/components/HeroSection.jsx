import { Button } from '../components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Welcome to Sweet Delights</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">Indulge in our heavenly pastries and cakes</p>
        <Button size="lg" className="text-lg px-8 py-3">Explore Our Menu</Button>
      </div>
    </section>
  )
}

