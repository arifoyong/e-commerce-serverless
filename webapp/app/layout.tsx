import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from "@/lib/utils"

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ProvideAuth } from '../context/useAuth'
import { Toaster } from '@/components/ui/toaster'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Archipelago Coffee',
  description: 'Enjoy the richness of Indonesian Single Origin coffees. We offer exclusive flavours, premium quality arabica coffee, robusta coffee and specialty coffee like Luwak Coffee. These brews are made from coffee beans sourced from one location from various farmers in Indonesia, such as Sumatra, Java, Sulawesi, Flores, and Papua.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}>
        <ProvideAuth>
          <NavBar />
          <div className='flex-1'>
          {children}
          </div>
          <Footer />
          <Toaster />
        </ProvideAuth>
      </body>
    </html>
  )
}
