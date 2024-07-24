import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { getSession } from '@/lib/getSession'
import { signOut } from '@/auth'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils'
import ListItem from '../ui/list-item'


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Pegawai",
        href: "/dataPegawai",
        description:
            "Data Pegawai",
    },
    {
        title: "User",
        href: "/dataUser",
        description:
            "Data User",
    },
]

const NavBar = async () => {
    const session = await getSession()
    const user = session?.user

    return (
        <nav className='fixed top-0 left-0 w-full px-[10vw] py-8 z-10 bg-blue text-light-blue flex justify-between items-center'>
            <Link href={"/"}>
                <h1 className='font-bold text-2xl'>SAI Attendance System</h1>
            </Link>
            <ul className='flex items-center space-x-4'>
                <li>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem className='text-light-blue'>
                                <NavigationMenuTrigger className='font-bold text-md'>Master Data</NavigationMenuTrigger>
                                <NavigationMenuContent className=' bg-light-blue text-blue'>
                                    <ul className="grid w-[200px] gap-3 p-4 rounded-xl">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                                className=""
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </li>
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