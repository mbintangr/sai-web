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
import { User } from '@prisma/client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoMenu, IoBriefcaseOutline, IoPersonOutline } from "react-icons/io5";


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
    {
        title: "Settings",
        href: "/settings",
        description:
            "System Settings",
    },
]

const NavBar = async () => {
    const session = await getSession()
    const user = session?.user

    return (
        <nav className='fixed top-0 left-0 w-full px-[10vw] py-6 sm:py-8 z-10 bg-blue text-light-blue flex justify-between items-center'>
            <Link href={"/"}>
                <h1 className='font-bold text-xl sm:text-2xl'>SAI Cibinong</h1>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className='block sm:hidden' asChild>
                    <Button className=''><IoMenu size={25} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=' bg-light-blue text-blue rounded-xl'>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    {user && (user as User).role === 'ADMIN' && <DropdownMenuSeparator className='bg-slate-300' /> }
                    {user && (user as User).role === 'ADMIN' && <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href='/dataPegawai' className='flex items-center'>
                                <IoBriefcaseOutline size={18} className='mr-2' />
                                <span>Pegawai</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href='/dataUser' className='flex items-center'>
                                <IoPersonOutline size={18} className='mr-2' />
                                <span>User</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>}
                    <DropdownMenuSeparator className='bg-slate-300' />
                    <DropdownMenuItem className=''>
                        {user ? <form action={async () => {
                            'use server'
                            await signOut()
                        }}>
                            <button type='submit' className="font-bold rounded-full w-auto">Logout &rarr;</button>
                        </form> : <Link href={'/login'} className='font-bold'>Login &rarr;</Link>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ul className='hidden sm:flex items-center space-x-4'>
                {user && (user as User).role === 'ADMIN' && <li>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem className='text-light-blue'>
                                <NavigationMenuTrigger className='font-bold text-md'>Master Data</NavigationMenuTrigger>
                                <NavigationMenuContent className=' bg-light-blue text-blue rounded-xl'>
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
                </li>}
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