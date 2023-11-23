'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Menu from './Menu'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import LoggedInUserMenu from './LoggedInUserMenu'
import { useAuth } from '@/context/useAuth'
import { LogIn } from 'lucide-react'

const NavBar = () => {
  const [isTop, setIsTop] = useState(false)
  const { user, isSignedIn, signOut } = useAuth()
  useEffect(() => {
    const scrollYPos: EventListener = () => {
      window.scrollY > 50 ? setIsTop(false) : setIsTop(true)
    }

    const windowWithListener: Window = window
    windowWithListener.addEventListener('scroll', () => {
      window.scrollY > 50 ? setIsTop(false) : setIsTop(true)
    })

    return () => window.removeEventListener('scroll', scrollYPos)
  },[])

  const getInitial = (username: string) => {
    const nameArr = username.split(' ')
    return nameArr.map((name) => name[0]).join('')
  }

  return (
    <header className={`${isTop 
            ? 'py-6' 
            : 'py-4 bg-white shadow-lg' } 
            sticky top-0 z-30 transition-all`}>
      <div className='container flex justify-between'>
         {/* MobileMenu */}
         <div className='flex lg:hidden'>
          <MobileMenu />
        </div>

        {/* Logo */}
        <Logo />
        
        
        <div className='flex flex items-center gap-8'>
          {/* Menu */}
          <Menu containerStyles='hidden lg:flex gap-x-8 items-center'
                linkStyles='relative hover:text-primary transition-all'
                underlineStyles='absolute h-[2px] left-0 bottom-0 w-full bg-primary'
          />

          {/* Login or User Info */}
          {isSignedIn 
            ? <LoggedInUserMenu userName={user?.username} signOut={signOut}/> 
            : (<Link className='text-muted-foreground hover:text-primary/70' href='/login'><LogIn/></Link>) } 
        </div>
      </div>
    </header>
  )
}

export default NavBar