import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatter } from '@/lib/date';
import { DateTime } from 'next-auth/providers/kakao';
import { getSession } from '@/lib/getSession';
import Search from '../Search';
import { redirect } from 'next/navigation';
import { deleteUserByUserId } from '@/action/user';

const UserTable = async ({ allUserData }: { allUserData: any }) => {
    const session = await getSession()
    const user = session?.user
    if (!user) {
        redirect('/login')
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl my-8'>Data User</h1>
                <Link href="/addUser"><Button className='bg-blue hover:bg-blue/80 rounded-2xl text-white'>Add User</Button></Link>
            </div>
            <Search />
            <Table className="mt-8">
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableHead className="w-[5%] font-bold text-center">No</TableHead>
                        <TableHead className="font-bold">Username</TableHead>
                        <TableHead className="font-bold text-center">Tanggal Dibuat</TableHead>
                        <TableHead className="font-bold text-center">Role</TableHead>
                        <TableHead className="font-bold text-center">Nama Pegawai</TableHead>
                        <TableHead className="font-bold text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allUserData?.map((user: { id: string; username: string; createdAt: DateTime; role: string; pegawai: { namaPegawai: string }; }, index: number) => (
                        <TableRow key={user.id}>
                            <TableCell className="w-fit text-center">{index + 1}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell className='text-center'>{formatter(user.createdAt.toString())}</TableCell>
                            <TableCell className='text-center'>{user.role}</TableCell>
                            <TableCell className='text-center'>{user.pegawai.namaPegawai}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2 justify-center">
                                    <Link href={`/editUser/${user.id}`}><Button className="bg-green hover:bg-green/80 rounded-2xl text-white">Edit</Button></Link>
                                    <form action={deleteUserByUserId.bind(null, user.id)} >
                                        <Button className="bg-orange hover:bg-orange/80 rounded-2xl text-white" type="submit">Delete</Button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default UserTable