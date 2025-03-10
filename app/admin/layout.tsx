import type React from "react"
import '../globals.css'
import { Inter } from "next/font/google"
import { SidebarNav } from ".././components/sidebar-nav"
import { Toaster } from ".././components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
  },
]

export const metadata = {
  title: "Caraven Fresh Admin Dashboard",
  description: "Admin dashboard for Caraven Fresh web application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <aside className="hidden w-64 bg-gray-100 lg:block">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <h2 className="text-lg font-semibold">Careven Fresh Admin</h2>
              </div>
              <SidebarNav items={sidebarNavItems} />
            </div>
          </aside>
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}



