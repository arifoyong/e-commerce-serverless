import React from 'react'
import Link from 'next/link'

const navs = [
  {
    name: 'User',
    path: '/admin/products'
  },
  {
    name: 'Products',
    path: '/admin/products'
  },
  {
    name: 'Stock',
    path: '/admin/products'
  },
  {
    name: 'Sales',
    path: '/admin/products'
  },
]

const SideBar = () => {
  return (
    <div className='bg-secondary flex flex-col mt-2 min-w-[150px]'>
      { navs.map((nav,i) => (
        <button className='border-2 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all' 
          key={i}>
          <Link href={nav.path}>{nav.name}</Link>
        </button>
      ))}
    </div>
  )
}

export default SideBar