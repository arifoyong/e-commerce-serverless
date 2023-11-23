import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="w-full h-[500px] object-cover relative">
      <Image src="/images/hero-image.webp"
          fill
          priority
          className="object-cover"
          alt="Picture of the author" />
      <div className="absolute flex flex-col justify-center items-center h-full w-full gap-6 text-white">
        <div className="text-center text-4xl md:text-6xl font-bold drop-shadow-2xl">
          Archipelago Coffee
        </div>

        <Link href="/products">
          <Button className='text-xl'>
              Shop Now
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Hero