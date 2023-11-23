import React from 'react'
import Socials from './Socials'

const Footer = () => {
  return (
    <footer className='bg-secondary py-8'>
      <div className="container mx-auto">
        <div className='flex lg:flex-row flex-col gap-4 items-center justify-between'>
          {/* Socials */}
          <Socials 
            containerStyles='flex gap-4'
            iconsStyles='text-secondary hover:text-primary transition-all'
          />

          {/* Copyright */}
          <div className='text-muted-foreground'>
            Copyright &#169;Archipelago Coffee. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer