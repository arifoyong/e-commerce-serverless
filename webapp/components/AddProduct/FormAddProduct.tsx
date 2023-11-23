"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import config  from '@/lib/aws-config'
import { API } from 'aws-amplify'
import { renameWithDate } from '@/lib/utils'
import { s3Upload } from '@/lib/s3-lib'

import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PenSquare } from 'lucide-react'

import { IProduct } from '@/types/product'
import { InitProduct } from '@/types/InitProduct'

const FormAddProduct = ({ initProduct, editMode }: { initProduct: IProduct, editMode: boolean }) => {
  const { toast } = useToast() 
  const router = useRouter()
  const [currentFile, setCurrentFile] = useState<File | null>();
  const [product, setProduct] = useState<IProduct>(InitProduct)
  
  useEffect(() => {
    setProduct(initProduct)
  },[initProduct])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    if (e.target.name === 'price')
      setProduct({...product, [e.target.name]: Number(e.target.value)})
    else {
      setProduct({...product, [e.target.name]: e.target.value})
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile= e.target.files?.[0]
    if (selectedFile && selectedFile.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please select a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000}MB` )
      return
    }

    setCurrentFile(selectedFile);
    setProduct({...product, pictures: renameWithDate( selectedFile?.name || '')})
  }

  const createProduct = async () => {
    try {
      const attachment = currentFile ? await s3Upload(product.pictures, currentFile) : null
      await API.post("product", `/product`, { body: product })
      router.push("/admin/products")
    } catch (err) {
      toast({
        title: 'Error',
        description: (err as Error).message
      })
    }
  }

  const UploadPlaceHolder = () => (
    <label htmlFor="dropzone-file" 
          className="w-full md:max-w-[24rem] h-[12rem] md:h-[24rem] flex flex-col items-center justify-center relative border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
      <input id="dropzone-file" 
            type="file" 
            accept="image"
            className="hidden" 
            onChange={handleFileChange}
            />
    </label>
  )

  const ImageCard = (imgFile?: File, imgPath?: string) => (
    <div className="w-full lg:max-w-[24rem] h-[12rem] lg:h-[24rem] relative">
        { imgFile  
          ? < Image src={URL.createObjectURL(imgFile)}
                fill
                className="object-contain object-top"
                sizes="(max-width: 64px)"
                alt='img' />
          : < Image src={`${config.cdn.URL}/public/${imgPath}`}
                fill
                className="object-contain object-top"
                sizes="(max-width: 64px)"
                alt='img' />
        }
      
        <label htmlFor="upload-file" className="absolute right-1 top-1 cursor-pointer">
          <PenSquare className="" size={20} />
          <input type="file"  id='upload-file'
                accept="image"
                className="hidden" 
                onChange={handleFileChange} />
        </label>
      </div>
  )

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure to delete this note?")
    if (!confirmed) {
      return
    }

    try {
      await API.del("product", `/product/${product.sk.replace("p#", "")}`, {})
      router.push("/admin/products")
    } catch (err) {
      toast({
        title: 'Error',
        description: (err as Error).message
      })
    }
  }


  const Form = () => (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      {/* Left Column (pictures) */}
      { currentFile ? ImageCard(currentFile, '') : ( product?.pictures 
                                                  ? ImageCard(undefined, product.pictures) 
                                                  : UploadPlaceHolder() )
      }

      {/* Right Column (Descriptions) */}
      <div className="flex flex-1 flex-col max-w-[600px] gap-2">
        <div className="flex gap-4 items-center">
          <label className="w-[120px]">Name: </label> 
          <Input type="text" name="name"
            value={ product && product.name }
            onChange={handleChange}
            placeholder='Coffee Formosa'
            autoComplete='off'
          />
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-[120px]">Profile: </label> 
          <Input type="text" name="profile"
            value={product && product.profile}
            onChange={handleChange}
            placeholder='Floral Fruity Apple'
            autoComplete='off'
          />
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-[120px]">Category: </label> 
          <Input type="text" name="category"
            value={product && product.category}
            onChange={handleChange}
            placeholder='Arabica'
            autoComplete='off'
          />
        </div>
        <div className="flex gap-4 items-center relative">
          <label className="w-[120px]">Price: </label> 
            <Input type="text" name="price"
              className='pl-6'
              value={product && product.price}
              onChange={handleChange}
              placeholder='12.00'
              autoComplete='off'
            />
            <span className='absolute left-[120px] top-2 text-muted-foreground'>$</span>
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-[120px]">Option: </label> 
          <Input type="text" name="option"
            value={product && product.option}
            onChange={handleChange}
            placeholder='Whole beans'
            autoComplete='off'
        />
        </div>
        <div className="flex gap-4 items-center">
          <label className="w-[120px]">Weight: </label> 
          <Input type="text" name="weight"
            value={product && product.weight}
            onChange={handleChange}
            placeholder='1kg'
            autoComplete='off'
        />
        </div>
        <div className="flex gap-4 items-start">
          <label className="w-[120px]">Description: </label>
          <Textarea name="description"
                  autoComplete='off'
                  value={product && product.description}
                  onChange={handleChange}
                  className="min-h-[12rem]"
                  placeholder="Single origin" />
        </div>     
        <div className="flex w-full justify-end gap-4">
          <Button onClick={() => createProduct()}>
            Save
          </Button>
          <Button variant='secondary'>
            <Link href='/admin/products'>
            Back
            </Link>
          </Button>
          { editMode && 
          <Button onClick={() => handleDelete()} 
            className='bg-destructive text-destructive-foreground'>
            Delete
          </Button>
          }
        </div>
      </div>
    </div>
  )

  return (
    <React.Fragment>
      { Form()  }
    </React.Fragment>
  )
}

export default FormAddProduct