import { Inter } from 'next/font/google'
import '../globals.css'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sweet Delights Pastry Shop',
  description: 'Delicious pastries and cakes for every occasion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}