"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import config  from '@/lib/aws-config'
import { API } from 'aws-amplify'
import { IProduct } from '@/types/product'
import { InitProduct } from '@/types/InitProduct'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Product = ({ params }: { params: { name: string } }) => {
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

  const ReadMode = () => (
    <div className="flex flex-col md:flex-row w-full gap-8">
      {/* Left Column (pictures) */}
      <div className="w-full md:max-w-[24rem] h-[12rem] md:h-[24rem] relative">
        {product?.pictures && <Image src={`${config.cdn.URL}/public/${product?.pictures}`}
              fill
              className="object-contain object-top"
              sizes="(max-width: 64px)"
              alt="Picture of the author" />}
      </div>

      {/* Right Column (Description) */}
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-2xl font-semibold">{ product && product.name }</h1>
        <p className="italic">{ product && product.profile }</p> 
        <p className="">${ product && formatPrice(product.price) }</p> 
        <p className="italic">{ product && product.category }</p> 
        <p className="">Packaging: { product && product.package }</p> 
        <p className="">weight: { product && product.weight }</p> 
        <button className="bg-gray-700 text-white py-2 md:w-1/2 mt-4">Add to cart</button>
        <p className="mt-4">{ product && product.description }</p>
      </div>
    </div>
  )

  const ImageCard = (imgFile?: File, imgPath?: string) => (
    <div className="w-full lg:max-w-[640px] h-[320px] lg:h-[480px] relative hover:opacity-80 transition-all">
      <Image src={`${config.cdn.URL}/public/${imgPath}`}
            fill
            className="object-contain object-top"
            sizes="(max-width: 64px)"
            alt='img' />
      </div>
  )

  const ReadMode2 = () => (
    <div className="container mx-auto pt-8 flex flex-col lg:flex-row w-full gap-8">
      {/* Left Column (pictures) */}
      { ImageCard(undefined, product.pictures)  }

      {/* Right Column (Descriptions) */}
      <div className="flex flex-1 flex-col max-w-[600px] gap-2">
        <h1 className="text-2xl font-semibold">{ product && product.name }</h1>
        <p className="italic">{ product && product.profile }</p> 
        <p className="">${ product && formatPrice(product.price) }</p> 
        <p className="italic">{ product && product.category }</p> 
        <p className="">Packaging: { product && product.package }</p> 
        <p className="">weight: { product && product.weight }</p> 
        <Button>Add to cart</Button>
       
        <p className="mt-4">{ product && product.description }</p>   
      </div>
    </div>
  )

  return (
    <React.Fragment>
      {  ReadMode2() }
    </React.Fragment>
  )
}

export default Product