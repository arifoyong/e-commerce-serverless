import Hero from '@/components/Home/Hero'
import OurCoffee from '@/components/Home/OurCoffee'
import Featured from '@/components/Home/Featured'

export default function Home() {
  return (
    <main className=''>
      <Hero />
      <div className='container'> 
        <Featured />
        <OurCoffee />
      </div>

    </main>
  )
}
