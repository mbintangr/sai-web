"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const PegawaiSchema = z.object({
    namaPegawai: z.string().min(1, {message: "Username is required"}),
    pendidikan: z.string().min(1, {message: "Pendidikan is required"}),
    golongan: z.string().min(1, {message: "Golongan is required"}),
    tanggalMulaiKerja: z.string().min(1, {message: "Tanggal Mulai Kerja is required"}),
});

const addPegawai = async (prevState: any, formData: FormData) => {
    const golonganIds = formData.get("golongan") as string;
    const validatedFields = PegawaiSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log(golonganIds);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const namaPegawai = validatedFields.data?.namaPegawai as string;
    const pendidikan = validatedFields.data?.pendidikan as string;
    const golonganId = Number(validatedFields.data?.golongan as string);
    const tanggalMulaiKerja = validatedFields.data?.tanggalMulaiKerja as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00Z`);

    console.log(namaPegawai, pendidikan, golonganId, mulaiKerja);
    
    const pegawai = await db.pegawai.create({
        data: {
            namaPegawai,
            pendidikan,
            golonganId,
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

const updatePegawaiById = async (id: number, formData: FormData) => {
    const namaPegawai = formData.get("namaPegawai") as string;
    const pendidikan = formData.get("pendidikan") as string;
    const golonganId = Number(formData.get("golonganId") as string);
    const tanggalMulaiKerja = formData.get("tanggalMulaiKerja") as string;

    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00`);

    const pegawai = await db.pegawai.update({
        where: {
            id
        },
        data: {
            namaPegawai,
            pendidikan,
            golonganId,
            mulaiKerja
        }
    });

    if (pegawai) {
        redirect("/dataPegawai")
    }
}

export { fetchAllPegawai, addPegawai, deletePegawaiById, updatePegawaiById, getPegawaiById }