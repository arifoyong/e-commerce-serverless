"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API } from 'aws-amplify'
import FormAddProduct from '@/components/AddProduct/FormAddProduct'
import { IProduct } from '@/types/product'
import { InitProduct } from '@/types/InitProduct'

const NewProduct = ({ params } : { params: { name: string }}) => {
  const router = useRouter()
  const [product, setProduct] = useState<IProduct>(InitProduct)
 
  useEffect(() => {
    const loadProduct = () => {
      return API.get("product", `/product/${params.name}`, {})
    }

    const load = async () => {
      const prod = await loadProduct()
      setProduct(prod[0])
    }
    load()
  },[params])
  
  return (
    <React.Fragment>
      <FormAddProduct initProduct={product} editMode={true}/>
    </React.Fragment>
  )
}

export default NewProduct