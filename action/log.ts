"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getSession } from "@/lib/getSession";
import { getUserByUserId } from "./user";

const addLog = async (type: string, message: string) => {
    const session = await getSession();
    const user = session?.user;
    const userId = user?.id as string;

    let userData = await getUserByUserId(userId);

    let logString = `[${userData?.username}] ${type} ${message}`

    const addLog = await db.webLog.create({
        data: {
            type,
            message: logString
        }
    })
}

const fetchAllLog = async (query: string) => {
    const log = await db.webLog.findMany({
        where: {
            message: {
                contains: query
            }
        },
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        }
    })
    return log
}

export { addLog, fetchAllLog }