'use client'
import React from 'react'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { MailIcon, HomeIcon, PhoneCall } from 'lucide-react'

const Contact = () => {
  return (
    <section className='container mx-auto'>
      {/* text & illustration */}
      <div className='grid lg:grid-cols-2 gap-24 pt-12 mb-6 lg:mb-24'>
        {/* text */}
        <div className='flex flex-col lg:items-end'>
          <div className='flex items-center gap-x-4 text-primary text-lg mb-b'>
            <span className='w-[30px] h-[3px] bg-primary'></span>
              Say Hello
          </div>
          <h1 className='text-6xl font-bold max-w-md mb-8 lg:text-right'>
            Let&apos;s work together
          </h1>
          <p className='text-lg text-muted-foreground max-w-[400px] lg:text-right'>
            Coffee is all you need
          </p>
        </div>

        {/* illustration */}
        <Image src='/images/Work-Together.svg' width={10} height={10} 
          alt='work-together' 
          priority
          className='hidden lg:flex w-3/4'
        />
      </div>

      {/* Contact & form */}
      <div className='grid lg:grid-cols-2 mb-24 lgg:mb-32'>
        <div className='flex lg:flex-row flex-col'>
          <div className='flex flex-col gap-y-4 xl:gap-y-6 mb-12 xl:mb-24 text-base xl:text-lg'>
              {/* Mail */}
              <div className='text-primary font-semibold'>Archipelago Coffee</div>
              <div className='flex items-center gap-x-8'>
                <MailIcon size={18} className='text-primary' />
                <div>archipelago-coffee@gmail.com</div>
              </div>

              {/* address */}
              <div className='flex items-center gap-x-8'>
                <HomeIcon size={18} className='text-primary' />
                <div>5 Jalan Mata Ayer, Singapore</div>
              </div>

              {/* phone */}
              <div className='flex items-center gap-x-8'>
                <PhoneCall size={18} className='text-primary' />
                <div>86522843</div>
              </div>
          </div>
        </div>

        <ContactForm />
       
      </div>
    </section>
  )
}

export default Contact