"use server";

import { db } from "@/lib/db";

const fetchAllGolongan = async (query?: string) => {
    const golongan = await db.golongan.findMany({})
    return golongan
}

const getGolonganById = async (id: number) => {
    const golongan = await db.golongan.findUnique({ where: { id } })
    return golongan
}

export { fetchAllGolongan, getGolonganById }