"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const PegawaiSchema = z.object({
    namaPegawai: z.string().min(1, {message: "Nama Pegawai is required"}),
    pendidikan: z.string().min(1, {message: "Pendidikan is required"}),
    golongan: z.string().min(1, {message: "Golongan is required"}),
    pin: z.string().min(6, {message: "Pin has to be 6 digit"}).max(6, {message: "Pin has to be 6 digit"}),
    tanggalMulaiKerja: z.string().min(1, {message: "Tanggal Mulai Kerja is required"}),
});

const AddPegawaiSchema = z.object({
    namaPegawai: z.string().min(1, {message: "Nama Pegawai is required"}),
    pendidikan: z.string().min(1, {message: "Pendidikan is required"}),
    golongan: z.string().min(1, {message: "Golongan is required"}),
    tanggalMulaiKerja: z.string().min(1, {message: "Tanggal Mulai Kerja is required"}),
});

const addPegawai = async (prevState: any, formData: FormData) => {
    const validatedFields = AddPegawaiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const namaPegawai = validatedFields.data?.namaPegawai as string;
    const pendidikan = validatedFields.data?.pendidikan as string;
    const golonganId = Number(validatedFields.data?.golongan as string);
    // const pin = Number(validatedFields.data?.pin as string);
    const tanggalMulaiKerja = validatedFields.data?.tanggalMulaiKerja as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00Z`);
    
    const pegawai = await db.pegawai.create({
        data: {
            namaPegawai,
            pendidikan,
            golonganId,
            // pin,
            mulaiKerja
        }
    })

    if (pegawai) {
        redirect("/dataPegawai");
    }
}

const fetchAllPegawai = async (query?: string) => {
    const pegawai = await db.pegawai.findMany({
        include: {
            golongan: true
        },
        where: {
            namaPegawai: {
                contains: query,
                mode: "insensitive"
            }
        }
    })
    return pegawai
}


const deletePegawaiById = async (id: number) => {
    const pegawai = await db.pegawai.delete({
        where: {
            id
        }
    })

    if (pegawai) {
        revalidatePath("/dataPegawai");
    }
}

const getPegawaiById = async (id: number) => {
    const pegawai = await db.pegawai.findUnique({
        where: {
            id
        },
        include: {
            golongan: true
        }
    })
    return pegawai
}

const updatePegawaiById = async (prevState: any, formData: FormData) => {
    const validatedFields = PegawaiSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const id = formData.get("id") as string;

    const namaPegawai = validatedFields.data?.namaPegawai as string;
    const pendidikan = validatedFields.data?.pendidikan as string;
    const golonganId = Number(validatedFields.data?.golongan as string);
    const pin = Number(validatedFields.data?.pin as string)
    const tanggalMulaiKerja = validatedFields.data?.tanggalMulaiKerja as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00Z`);

    const pegawai = await db.pegawai.update({
        where: {
            id: Number(id),
        },
        data: {
            namaPegawai,
            pendidikan,
            golonganId,
            pin,
            mulaiKerja
        }
    });

    if (pegawai) {
        redirect("/dataPegawai")
    }
}

export { fetchAllPegawai, addPegawai, deletePegawaiById, updatePegawaiById, getPegawaiById }