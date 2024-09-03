/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Absensi" ALTER COLUMN "waktuMasuk" SET DEFAULT timezone('Asia/Jakarta', now());

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pin" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_pin_key" ON "User"("pin");
