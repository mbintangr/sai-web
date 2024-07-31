"use client";

import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { addPegawai } from '@/action/pegawai';
import { useFormState } from 'react-dom';

interface AddDataPegawaiProps {
    dataGolongan: { id: number; namaGolongan: string; gajiPokok: string }[];
}

const AddDataPegawai = ({ dataGolongan }: AddDataPegawaiProps) => {
    const [tanggalMulaiKerja, setTanggalMulaiKerja] = useState('');
    const [selectedGolongan, setSelectedGolongan] = useState('');
    const namaPegawaiRef = useRef<HTMLInputElement>(null);
    const pendidikanRef = useRef<HTMLInputElement>(null)

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTanggalMulaiKerja(e.target.value);
    };

    const handleSelectChange = (value: string) => {
        setSelectedGolongan(value);
    };

    const [state, formAction] = useFormState(addPegawai, null);

    return (
        <form action={formAction} className='mt-8 max-w-[400px] w-[50%]'>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="namaPegawai">Nama Pegawai:</Label>
                        <Input id="namaPegawai" name="namaPegawai" placeholder="Nama Pegawai" ref={namaPegawaiRef} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="text" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.namaPegawai}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="pendidikan">Pendidikan:</Label>
                        <Input id="pendidikan" name="pendidikan" placeholder="Pendidikan" ref={pendidikanRef} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="text" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.pendidikan}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="golongan">Golongan:</Label>
                        <Select onValueChange={handleSelectChange} name="golongan">
                            <SelectTrigger className="rounded-xl focus:border-2  focus:border-orange placeholder:text-black/50 w-auto">
                                <SelectValue placeholder="Golongan" />
                            </SelectTrigger>
                            <SelectContent className='bg-light-blue rounded-xl text-blue'>
                                <SelectGroup className="rounded-xl border-1 border-orange">
                                    <SelectLabel>Golongan</SelectLabel>
                                    {dataGolongan.map((golongan) => (
                                        <SelectItem key={golongan.id} value={golongan.id.toString()} className="hover:cursor-pointer">
                                            {golongan.namaGolongan}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.golongan}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalMulaiKerja">Tanggal Mulai Kerja:</Label>
                        <Input id="tanggalMulaiKerja" name="tanggalMulaiKerja" placeholder="Tanggal Masuk" onChange={handleDateChange} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-auto" type="date" />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.tanggalMulaiKerja}</p>

                    <div className="w-full flex items-center justify-start">
                        <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4" type="submit">Save</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddDataPegawai;
