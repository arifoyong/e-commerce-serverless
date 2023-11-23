'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// import config  from '@/lib/aws-config'
import { API } from 'aws-amplify'
import { IProduct } from '@/types/product'
import { DataTable, columns } from '@/components/DataTable'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const [lastKey, setLastKey] = useState(null)

  const loadProducts = async () => {
    // const params = {
    //   limit: config.PRODUCTS_PER_PAGE,
    //   lastEvaluatedKey: lastKey
    // }
    const allProducts = await API.post("product", "/listproduct",  { body: {} } )
    // setLastKey(allProducts.LastEvaluatedKey)
    setProducts([...products, ...allProducts.Items])
  }

  useEffect(() => {
    loadProducts()
  },[])

  // const handleNext = () => {
  //   setCurrentPage(currentPage+1)

  //   const noOfItemsToLoad = currentPage * config.PRODUCTS_PER_PAGE
  //   if (noOfItemsToLoad >= products.length) {
  //     loadProducts()
  //   }
  // }
  
  // const handlePrev = () => {
  //   setCurrentPage(currentPage-1)
  // }

  // const DisplayTable = () => (
  //   <table className='table-auto'>
  //     <thead>
  //     <tr className='font-semibold' >
  //       <th className=''>Link</th>
  //       <th className=''>Name</th>
  //       <th className=''>Profile</th>
  //       <th className=''>Price</th>
  //       <th className=''>Description</th>
  //     </tr>
  //     </thead>
  //     <tbody>
  //     { products.slice(currentPage*config.PRODUCTS_PER_PAGE-config.PRODUCTS_PER_PAGE, currentPage*config.PRODUCTS_PER_PAGE).map((product,i) => (
  //         <tr>
  //           <td className=''>
  //           <Link className='' 
  //             key={i}
  //             href={`/admin/products/${product.sk.replace('p#','')}`}>
  //               link
  //           </Link>
  //           </td>
  //           <td className=''>{product.name}</td>
  //           <td className=''>{product.profile}</td>
  //           <td className=''>{product.price}</td>
  //           <td className=''>{product.description.substr(0,50)} ...</td>
  //         </tr>
  //     ))}
  //     </tbody>
  //   </table>
  // )
  
  return (
    <section className='container mx-auto py-2'>
      <Button className='mb-2'>
        <Link href='/admin/products/new'>
          ADD ITEM
        </Link>
      </Button>
      <DataTable columns={columns} data={products} />
    </section>
  )
}

export default Products