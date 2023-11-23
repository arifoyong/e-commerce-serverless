import React from 'react'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent,PopoverTrigger } from "@/components/ui/popover"

const LoggedInUserMenu = ({userName, signOut} : {userName: string, signOut: () => void}) => {
  const handleSignOut = () => {
    signOut()
  }

  return (
    <Popover>
      <PopoverTrigger>
        <User className="cursor-pointer rounded-full hover:text-primary hover:border-2 hover:border-primary transition-all "/>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2'>
          {/* Title */}
          <h2 className='font-semibold'>Hi, {userName}</h2>
          <Separator className='mb-4'/>

          {/* Menu */}
          <button className='text-left'>
            <Link className='uppercase hover:text-primary transition-all'
                  href='/admin'>
              Admin
            </Link>
          </button>
          <button className='flex flex-row gap-2 items-center text-left uppercase hover:text-primary transition-all ' 
              onClick={() => handleSignOut()}>
                <span>Logout</span>
                <LogOut size='20px' />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LoggedInUserMenu