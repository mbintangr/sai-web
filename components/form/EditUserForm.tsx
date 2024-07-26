"use client";
import React, { useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { register, updateUser } from '@/action/user';


const EditDataUser = ({ dataPegawai, dataUser }: { dataPegawai: any, dataUser: any }) => {
    const [selectedPegawai, setSelectedPegawai] = useState(dataUser.pegawaiId.toString())
    const [selectedRole, setSelectedRole] = useState('PEGAWAI')
    const [username, setUsername] = useState(dataUser.username)
    const [password, setPassword] = useState(dataUser.password)
    const [rePassword, setRePassword] = useState(dataUser.password)

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);
    };

    const handleSelectPegawaiChange = (value: string) => {
        setSelectedPegawai(value);
    };

    const handleSelectRoleChange = (value: string) => {
        setSelectedRole(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('pegawaiId', selectedPegawai)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('rePassword', rePassword)
        formData.append('role', selectedRole)

        await updateUser(dataUser.id, formData)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                            <Label htmlFor="pegawai">Nama Pegawai:</Label>
                            <Select value={selectedPegawai} onValueChange={handleSelectPegawaiChange} name="pegawai">
                                <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full">
                                    <SelectValue placeholder="Nama Pegawai" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange">
                                        <SelectLabel>Nama Pegawai</SelectLabel>
                                        {dataPegawai.map((pegawai?: any) => (
                                            <SelectItem key={pegawai.id} value={pegawai.id.toString()} className="hover:cursor-pointer">
                                                {pegawai.namaPegawai}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                            <Label htmlFor="username">Username:</Label>
                            <Input id="username" name="username" placeholder="user123" value={username} onChange={handleUsernameChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="text" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                            <Label htmlFor="password">Password:</Label>
                            <Input id="password" name="password" placeholder="*********" value={password} onChange={handlePasswordChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="password" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                            <Label htmlFor="repassword">Re-Type Password:</Label>
                            <Input id="repassword" name="repassword" placeholder="*********" value={rePassword} onChange={handleRePasswordChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="password" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                            <Label htmlFor="role">Role:</Label>
                            <Select value={selectedRole} onValueChange={handleSelectRoleChange} name="role">
                                <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="rounded-xl border-1 border-orange shadow-md bg-light-orange text-orange">
                                        <SelectLabel>Role</SelectLabel>
                                        <SelectItem value="ADMIN" className="hover:cursor-pointer">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="PRINCIPAL" className="hover:cursor-pointer">
                                            Principle
                                        </SelectItem>
                                        <SelectItem value="PEGAWAI" className="hover:cursor-pointer">
                                            Pegawai
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center mt-2">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4 sm:px-8" type="submit">Update &rarr;</Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditDataUser