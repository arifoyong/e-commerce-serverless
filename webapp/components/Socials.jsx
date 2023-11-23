'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

const icons = [
  {
    path: '/',
    name: <Instagram />
  },
  {
    path: '/',
    name: <Facebook />
  },
  {
    path: '/',
    name: <Twitter />
  },
]

const Socials = ({ containerStyles, iconsStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      { icons.map((icon,i) => (
        <Link href={icon.path} key={i}>
          <div className={`${iconsStyles}`}>
            {icon.name}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Socials