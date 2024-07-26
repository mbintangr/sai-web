"use client"
import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { login } from '@/action/user'
import { useFormState } from 'react-dom'

const LoginForm = () => {
    const [state, formAction] = useFormState(login, null);
    return (
        <form action={formAction}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="username">Username:</Label>
                        <Input id="username" name="username" placeholder="your_username" className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="text" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.username}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="password">Password:</Label>
                        <Input id="password" name="password" placeholder="*********" className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="password" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.password}</p>

                    <div className="w-full flex items-center justify-center">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4 sm:px-8" type="submit">Login &rarr;</Button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default LoginForm