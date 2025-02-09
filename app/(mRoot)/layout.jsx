import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
{/*import { Toaster } from '@/@/components/ui/toaster'*/}

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sweet Delights Pastry Shop',
  description: 'Delicious pastries and cakes for every occasion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionProvider>
          <Navbar />
        </SessionProvider>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}