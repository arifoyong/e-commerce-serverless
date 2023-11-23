'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const links = [
  { path: '/', name: 'Home' },
  { path: '/products', name: 'Products' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
]

const Menu = ({ containerStyles, linkStyles, underlineStyles } 
              : { containerStyles: string, linkStyles: string, underlineStyles?: string }) => {
  const path = usePathname()
  return (
    <div className={containerStyles}>
          { links.map((link,i) => (
            <Link href={link.path} key={i} className={linkStyles}>
              {link.path === path && 
                <motion.span initial={{ y: '-100%' }} 
                            animate={{ y: 0 }} 
                            transition={{ type: 'tween'}}
                            layoutId='underline'
                  className={underlineStyles}/>
              }
              {link.name}
            </Link>
          ))}
        </div>
  )
}

export default Menu