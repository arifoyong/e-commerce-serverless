'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import config  from '@/lib/aws-config'
import { API } from 'aws-amplify'
import { IProduct } from '@/types/product'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastKey, setLastKey] = useState(null)
 
  const loadProducts = async () => {
    const params = {
      limit: config.PRODUCTS_PER_PAGE,
      lastEvaluatedKey: lastKey
    }
    const allProducts = await API.post("product", "/listproduct",  { body: params } )
    
    setLastKey(allProducts.LastEvaluatedKey)
    setProducts([...products, ...allProducts.Items])
  }

  useEffect(() => {
    loadProducts()
  },[])

  const handleNext = () => {
    setCurrentPage(currentPage+1)

    const noOfItemsToLoad = currentPage * config.PRODUCTS_PER_PAGE
    if (noOfItemsToLoad >= products.length) {
      loadProducts()
    }
  }
  
  const handlePrev = () => {
    setCurrentPage(currentPage-1)
  }

  const ProductCard = ({ detail } : { detail: IProduct }) => (
    <div className="flex flex-col relative py-2 mb-4 border-2 group border-gray-300 h-full">
      <div className="mx-auto overflow-hidden">
        {/* < Image src={`${config.cdn.URL}/public/${detail?.pictures}`}
              className="w-full h-8 object-contain scale-100 group-hover:scale-125 ease-in transition-all"
              width={0}
              height={0}
              sizes="100vw"
              alt={detail.pictures} /> */}
        <Image
              src={`${config.cdn.URL}/public/${detail?.pictures}`}
              alt={detail.name}
              width={0}
              height={0}
              sizes="100vw"
              className= "h-48 w-auto object-fit transition-all hover:scale-105"
            />
      </div>
      <div>
        <div className="bg-secondary text-sm px-2 py-2">
          {detail.profile}
        </div>
        <div className="text-primary font-semibold px-2 py-2">
          {detail.name}
        </div>
        <div className="px-2 font-semibold text-md">
          ${Number(detail.price).toFixed(2)}
      </div>
      </div>
    </div>
  )

  return (
    <section className='container mx-auto py-8'>
      {/* Title section */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-4xl font-semibold'>Products</h2>
        <div className='flex flex-row gap-2'>
          <Button variant='outline' 
                  onClick={() => handlePrev()}
                  disabled={currentPage === 1} >
            <ChevronLeft />
          </Button>
          <Button variant='outline' 
                  onClick={() => handleNext()}
                  disabled={!lastKey &&  currentPage * config.PRODUCTS_PER_PAGE >= products.length} >
            <ChevronRight />
          </Button>  
        </div>
      </div>

      {/* Products Section */}
      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-6">
        {products && products.slice(currentPage*config.PRODUCTS_PER_PAGE-config.PRODUCTS_PER_PAGE, currentPage*config.PRODUCTS_PER_PAGE).map((product: IProduct, i) => (
          <div key={i}>
            <Link href={`/products/${product.sk.replace("p#","")}`}>
              <ProductCard detail={product}/>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products