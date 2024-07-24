/*
  Warnings:

  - You are about to drop the column `DateTime` on the `Absensi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "DateTime",
ADD COLUMN     "waktu_masuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
