import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { getSession } from '@/lib/getSession'
import { signOut } from '@/auth'

const NavBar = async () => {
    const session = await getSession()
    const user = session?.user

    return (
        <nav className='fixed top-0 left-0 w-full px-[10vw] py-8 z-10 bg-blue text-light-blue flex justify-between items-center'>
            <Link href={"/"}>
                <h1 className='font-bold text-2xl'>SAI Attendance System</h1>
            </Link>
            <ul className='flex items-center space-x-4'>
                {user && user.role === 'ADMIN' && <li className='font-bold hover:text-light-blue/80'><Link href={"/register"}>Register</Link></li>}
                {!user && <li className='font-bold'><Link href="/login"><Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4">Login</Button></Link></li>}
                {user && <form action={async () => {
                    'use server'
                    await signOut()
                }}>
                    <li className='font-bold hover:opacity-90 bg-orange rounded-full'>
                        <Button type='submit' className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4">Logout</Button>
                    </li>
                </form>}
            </ul>
        </nav>
    )
}

export default NavBar