"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { MailIcon, KeyRound } from 'lucide-react'

import { useAuth } from '@/context/useAuth'
 
const formSchema = z.object({
  email: z.string()
          .min(1, { message: "This field has to be filled." })
          .email("This is not a valid email."),
  password: z.string()
})

const Login = () => {
  const router = useRouter()
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { signIn } = useAuth()
 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values)
      router.push('/')
    } catch (e) {
      toast({
        title: 'Error ',
        description: (e as Error).message
      })
    }
  }
  
  return (
    <div className='container mx-auto max-w-[480px] py-12 mb-12'>
      <h1 className='text-2xl text-center font-semibold mb-8 text-secondary-foreground tracking-[6px]'>LOGIN</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl >
                  <Input type='email' placeholder="johnlee@email.com" {...field} autoComplete='off'/>
                </FormControl>
                <MailIcon className='absolute right-2 text-muted-foreground top-0'/>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className='relative'>
                <FormControl >
                  <Input type='password' placeholder="password" {...field} />
                </FormControl>
                <KeyRound className='absolute right-2 text-muted-foreground top-0'/>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <div className='flex justify-end'>
            <Button type="submit">LOGIN</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Login