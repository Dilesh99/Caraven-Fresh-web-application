// components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Menu, ShoppingCart } from 'lucide-react'
import User from './User'
import { useCart } from '../components/context/CartContext'
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname(); // Get the current route
  const isCartRoute = pathname === '/cart';
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavItems = ({ isScrolled }) => (
    <>
      <Link href="/#nav" className={`text-foreground ${isScrolled || isCartRoute ? 'text-black' : 'text-white'}  hover:text-aqua transition-colors`}>Home</Link>
      <Link href="/#products" className={`text-foreground ${isScrolled || isCartRoute  ? 'text-black' : 'text-white'}  hover:text-aqua transition-colors`}>Products</Link>
      <Link href="#about" className={`text-foreground ${isScrolled || isCartRoute  ? 'text-black' : 'text-white'}  hover:text-aqua transition-colors`}>About</Link>
      <Link href="/#contact" className={`text-foreground ${isScrolled || isCartRoute  ? 'text-black' : 'text-white'}  hover:text-aqua transition-colors`}>Contact</Link>
      <Link href="../cart" className={`text-foreground ${isScrolled || isCartRoute  ? 'text-black' : 'text-white'}  hover:text-aqua transition-colors flex items-center`}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        <span>({cart.length})</span>
      </Link>
      <User isScrolled={isScrolled || isCartRoute} />
    </>
  )

  return (
    <nav id='nav' className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isCartRoute  ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-bold text-primary ${isScrolled || isCartRoute ? 'text-black' : 'text-white'}`}>Careven Fresh</Link>
        <div className="hidden md:flex space-x-4 items-center">
          <NavItems isScrolled={isScrolled} />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-4">
              <NavItems isScrolled={isScrolled} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}