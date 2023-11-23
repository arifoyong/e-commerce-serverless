'use client'
import React from 'react'
import isAuth from '@/components/isAuth'

const AdminPage = () => {
  return (
    <section className='container'>
      Admin Page
    </section>
  )
}

export default isAuth(AdminPage)