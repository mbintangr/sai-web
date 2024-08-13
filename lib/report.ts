'use server';
import { checkStatus, getNumberOfWeekdays } from "./date";
import { fetchAbsensiByPegawaiId_monthly } from "@/action/absensi";

const processData = async (pegawaiData: any[], date: string): Promise<any[]> => {
    const reportData: any[] = [];

    for (const pegawai of pegawaiData) {
        const absensiPegawai = await fetchAbsensiByPegawaiId_monthly(pegawai.id, date);

        let keterlambatanMenit = 0;
        let ketidakhadiranHari = getNumberOfWeekdays(date);

        absensiPegawai.forEach((absensi) => {
            if (checkStatus(absensi.waktuMasuk.toString()).status !== 'Pulang') {
                keterlambatanMenit += checkStatus(absensi.waktuMasuk.toString()).minutesLate;
                ketidakhadiranHari -= 1;
            }
        });

        let totalMenitKerja = (getNumberOfWeekdays(date) * 8 * 60) - keterlambatanMenit - (ketidakhadiranHari * 8 * 60);

        const keterlambatanPotongan = 60000 - keterlambatanMenit * 1000;
        let keterlambatanKonversi = 0;
        if (keterlambatanPotongan > 0) {
            keterlambatanKonversi = 0;
        } else {
            keterlambatanKonversi = keterlambatanPotongan * -1;
        }

        const ketidakhadiranPotongan = ketidakhadiranHari * 25000;
        let ketidakhadiranKonversi = 0;
        if (ketidakhadiranPotongan > 0) {
            ketidakhadiranKonversi = ketidakhadiranPotongan;
        }

        const tmkPercentage = totalMenitKerja/(getNumberOfWeekdays(date) * 8 * 60)

        let pointAbsen = 0
        if (tmkPercentage >= 0.95) {
            pointAbsen = 10
        } else if (tmkPercentage >= 0.9) {
            pointAbsen = 9
        } else if (tmkPercentage >= 0.8) {
            pointAbsen = 8
        } else if (tmkPercentage >= 0.7) {
            pointAbsen = 7
        } else if (tmkPercentage >= 0.6) {
            pointAbsen = 6
        } else if (tmkPercentage >= 0.5) {
            pointAbsen = 5
        } else if (tmkPercentage >= 0.4) {
            pointAbsen = 4
        } else if (tmkPercentage >= 0.3) {
            pointAbsen = 3
        } else {
            pointAbsen = 2
        } 

        reportData.push({
            id: pegawai.id,
            nama: pegawai.namaPegawai,
            keterlambatanMenit,
            keterlambatanPotongan,
            keterlambatanKonversi,
            ketidakhadiranHari,
            ketidakhadiranPotongan,
            ketidakhadiranKonversi,
            totalMenitKerja,
            pointAbsen,
        });
    }

    return reportData;
};

export { processData };
