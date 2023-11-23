import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AlignJustify } from 'lucide-react'
import Menu from './Menu'
import Socials from '@/components/Socials'
import Logo from './Logo'

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer"/>
      </SheetTrigger>
      <SheetContent side='top'>
        <div className='flex flex-col items-center justify-between h-full py-4'>
          <div className='flex flex-col items-center gap-y-8'>
            <Logo />
            <Menu 
              containerStyles='flex flex-col items-center gap-y-6' 
              linkStyles='text-2xl'
            /> 
          </div>
          <Socials containerStyles='flex gap-x-4 mt-8'
              iconsStyles='text-2xl hover:text-primary transition-all'
            />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu