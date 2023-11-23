"use client"

import React, { useEffect, useState } from 'react'
import FormAddProduct from '@/components/AddProduct/FormAddProduct'
import { IProduct } from '@/types/product'
import { InitProduct } from '@/types/InitProduct'

const NewProduct = () => {
  return (
    <React.Fragment>
      <FormAddProduct initProduct={InitProduct} editMode={false}/>
    </React.Fragment>
  )
}

export default NewProduct