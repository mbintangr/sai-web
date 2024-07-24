"use server";

import { db } from "@/lib/db";

const fetchAllGolongan = async (query?: string) => {
    const golongan = await db.golongan.findMany({})
    return golongan
}

export { fetchAllGolongan }