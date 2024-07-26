-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_pegawaiId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pegawaiId_fkey";

-- AlterTable
ALTER TABLE "Absensi" ALTER COLUMN "waktuMasuk" SET DEFAULT timezone('Asia/Jakarta', now());

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_pegawaiId_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "Pegawai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pegawaiId_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "Pegawai"("id") ON DELETE CASCADE ON UPDATE CASCADE;
