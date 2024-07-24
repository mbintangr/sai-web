"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

const addPegawai = async (formData: FormData) => {
    const namaPegawai = formData.get("namaPegawai") as string;
    const pendidikan = formData.get("pendidikan") as string;
    const golonganId = Number(formData.get("golonganId") as string);
    const tanggalMulaiKerja = formData.get("tanggalMulaiKerja") as string;
    const mulaiKerja = new Date(`${tanggalMulaiKerja}T00:00:00`);
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