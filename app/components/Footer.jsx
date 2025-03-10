import Link from 'next/link'

export default function Footer() {
  return (
    <footer id='contact' className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Caraven Fresh</h3>
            <p>Delicious pastries and cakes for every occasion</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className=" hover:text-aqua transition-colors">Home</Link></li>
              <li><Link href="/#products" className=" hover:text-aqua transition-colors">Products</Link></li>
              <li><Link href="#about" className=" hover:text-aqua transition-colors">About</Link></li>
              <li><Link href="/#contact" className=" hover:text-aqua transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>123 Bakery Street</p>
            <p>Colombo 7</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@caravenfresh.com</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Caraven Fresh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

