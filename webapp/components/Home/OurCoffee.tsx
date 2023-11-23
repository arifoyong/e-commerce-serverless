import React from 'react'
import Image from 'next/image'

const OurCoffee = () => {
  return (
    <section className='flex flex-col my-8'>
      {/* Indonesian single origin */}
      <div className='grid lg:grid-cols-2 bg-secondary gap-4 p-8 '>
        <Image src='/images/culture.webp' width={640} height={640}
          alt='culture'
          className='w-full'/>
        <div className='flex flex-col justify-center'>
          <h2 className='text-primary text-xl lg:text-3xl font-semibold mb-4  '>Discover Indonesian Single Origin Arabica</h2>
          <p className='text-muted-foreground'>Every single coffee that we provide inspired by the local indonesian communities. From the specially curated Toraja coffee to the rare & exquisite Luwak coffee.</p>
        </div>
      </div>

      {/* Sustainable */}
      <div className='grid lg:grid-cols-2 bg-secondary gap-4 p-8'>
        <div className='flex flex-col justify-center order-last lg:order-none'>
          <h2 className='text-primary text-xl lg:text-3xl font-semibold mb-4'>Sustainable Farming</h2>
          <p className='text-muted-foreground'>Every single coffee that we provide inspired by the local indonesian communities. From the specially curated Toraja coffee to the rare & exquisite Luwak coffee.</p>
        </div>
        <Image src='/images/coffee-farmer.webp' width={640} height={640}
          alt='culture'
          className='w-full'/>
      </div>

    </section>
  )
}

export default OurCoffee