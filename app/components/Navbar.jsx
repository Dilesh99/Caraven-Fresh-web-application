'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavItems = () => (
    <>
      <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
      <Link href="#products" className="text-foreground hover:text-primary transition-colors">Products</Link>
      <Link href="#about" className="text-foreground hover:text-primary transition-colors">About</Link>
      <Link href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
      <Button variant="outline" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </>
  )

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">Caraven Fresh </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <NavItems />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-4">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

