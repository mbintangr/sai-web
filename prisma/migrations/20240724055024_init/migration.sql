/*
  Warnings:

  - You are about to drop the column `waktu_masuk` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `gaji_pokok` on the `Golongan` table. All the data in the column will be lost.
  - You are about to drop the column `nama_golongan` on the `Golongan` table. All the data in the column will be lost.
  - You are about to drop the column `mulai_kerja` on the `Pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `nama_pegawai` on the `Pegawai` table. All the data in the column will be lost.
  - Added the required column `gajiPokok` to the `Golongan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaGolongan` to the `Golongan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mulaiKerja` to the `Pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaPegawai` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "waktu_masuk",
ADD COLUMN     "waktuMasuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Golongan" DROP COLUMN "gaji_pokok",
DROP COLUMN "nama_golongan",
ADD COLUMN     "gajiPokok" TEXT NOT NULL,
ADD COLUMN     "namaGolongan" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pegawai" DROP COLUMN "mulai_kerja",
DROP COLUMN "nama_pegawai",
ADD COLUMN     "mulaiKerja" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "namaPegawai" TEXT NOT NULL;
