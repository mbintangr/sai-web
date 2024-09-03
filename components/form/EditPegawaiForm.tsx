"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractDate } from '@/lib/date';
import { updatePegawaiById } from '@/action/pegawai';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormState } from 'react-dom';

const EditDataPegawai = ({ dataPegawai, dataGolongan }: { dataPegawai: any, dataGolongan: any }) => {
    const [tanggalMulaiKerja, setTanggalMulaiKerja] = useState(extractDate(dataPegawai.mulaiKerja));
    const [selectedGolongan, setSelectedGolongan] = useState(dataPegawai.golonganId.toString());
    const namaPegawaiRef = useRef<HTMLInputElement>(dataPegawai.namaPegawai);
    const pendidikanRef = useRef<HTMLInputElement>(dataPegawai.pendidikan);
    const pinRef = useRef<HTMLInputElement>(dataPegawai.pin);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTanggalMulaiKerja(e.target.value);
    };

    const handleSelectChange = (value: string) => {
        setSelectedGolongan(value);
    };

    const [state, formAction] = useFormState(updatePegawaiById, null);
    
    return (
        <form action={formAction} className=''>
            <div className="grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <Input id="id" name="id" placeholder="Id" value={dataPegawai.id} className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full" type="hidden" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="namaPegawai">Nama Pegawai:</Label>
                        <Input
                            id="namaPegawai"
                            name="namaPegawai"
                            placeholder="Nama Pegawai"
                            ref={namaPegawaiRef}
                            defaultValue={dataPegawai.namaPegawai}
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                            type="text"
                        />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.namaPegawai}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="pendidikan">Pendidikan:</Label>
                        <Input
                            id="pendidikan"
                            name="pendidikan"
                            placeholder="Pendidikan"
                            ref={pendidikanRef}
                            defaultValue={dataPegawai.pendidikan}
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                            type="text"
                        />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.pendidikan}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="golongan">Golongan:</Label>
                        <Select value={selectedGolongan} onValueChange={handleSelectChange} name="golongan">
                            <SelectTrigger className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-fit">
                                <SelectValue placeholder="Golongan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="bg-white rounded-xl border-1 border-orange">
                                    <SelectLabel>Golongan</SelectLabel>
                                    {dataGolongan.map((golongan: { id: React.Key; namaGolongan: React.ReactNode }) => (
                                        <SelectItem key={golongan.id} value={golongan.id?.toString() || ''} className="hover:cursor-pointer">
                                            {golongan.namaGolongan}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.golongan}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="pin">Pin:</Label>
                        <Input
                            id="pin"
                            name="pin"
                            placeholder="Pin"
                            ref={pinRef}
                            defaultValue={dataPegawai.pin}
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-full"
                            type="number"
                        />
                    </div>
                    <p className='text-red-600 text-right text-xs'>{state?.error?.pin}</p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-x-4 sm:space-y-0">
                        <Label htmlFor="tanggalMulaiKerja">Tanggal Mulai Kerja:</Label>
                        <Input
                            id="tanggalMulaiKerja"
                            name="tanggalMulaiKerja"
                            placeholder="Tanggal Masuk"
                            value={tanggalMulaiKerja}
                            onChange={handleDateChange}
                            className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50 w-fit"
                            type="date"
                        />
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

export default EditDataPegawai;
