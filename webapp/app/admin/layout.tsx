import React from 'react'
import SideBar from '../../components/SideBar'

export default function Layout({ children } : { children: React.ReactNode}) {
  return (
    <div className='flex'>
      <SideBar/>
     
      <div className='flex-1 p-2 mt-4'>
        {children}
      </div>
    </div>
  )
}

