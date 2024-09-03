/*
  Warnings:

  - You are about to drop the column `pin` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pin]` on the table `Pegawai` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_pin_key";

-- AlterTable
ALTER TABLE "Absensi" ALTER COLUMN "waktuMasuk" SET DEFAULT timezone('Asia/Jakarta', now());

-- AlterTable
ALTER TABLE "Pegawai" ADD COLUMN     "pin" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pin";

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_pin_key" ON "Pegawai"("pin");
