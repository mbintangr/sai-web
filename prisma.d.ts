import { PrismaClient } from '@prisma/client';
import { UserRole } from '@prisma/client';

declare module '@prisma/client' {
    interface User {
        pegawaiId: number;
        role: UserRole;
    }
}