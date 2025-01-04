/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Absensi" ALTER COLUMN "waktuMasuk" SET DEFAULT timezone('Asia/Jakarta', now());

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Settings";

-- CreateTable
CREATE TABLE "WebSettings" (
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "WebSettings_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "WebLog" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebLog_pkey" PRIMARY KEY ("id")
);
