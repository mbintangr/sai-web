import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      pegawaiId?: number;
      role?: UserRole;
    };
  }

  interface User {
    id: string;
    username: string;
    pegawaiId?: number;
    role?: UserRole;
  }
}