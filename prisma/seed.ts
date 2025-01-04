import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const golonganData = [
        { namaGolongan: '1S-1', gajiPokok: '550000' },
        { namaGolongan: '1S-2', gajiPokok: '600000' },
        { namaGolongan: '1S-3', gajiPokok: '650000' },
        { namaGolongan: '1S-4', gajiPokok: '700000' },
        { namaGolongan: '1S-5', gajiPokok: '750000' },
        { namaGolongan: '1S-6', gajiPokok: '800000' },
        { namaGolongan: '1A-0', gajiPokok: '800000' },
        { namaGolongan: '1A-1', gajiPokok: '850000' },
        { namaGolongan: '1A-2', gajiPokok: '900000' },
        { namaGolongan: '1A-3', gajiPokok: '950000' },
        { namaGolongan: '1A-4', gajiPokok: '1000000' },
        { namaGolongan: '1A-5', gajiPokok: '1050000' },
        { namaGolongan: '1A-6', gajiPokok: '1100000' },
        { namaGolongan: '1I-0', gajiPokok: '1100000' },
        { namaGolongan: '1I-1', gajiPokok: '1240000' },
        { namaGolongan: '1I-2', gajiPokok: '1380000' },
        { namaGolongan: '1I-3', gajiPokok: '1530000' },
        { namaGolongan: '1I-4', gajiPokok: '1680000' },
        { namaGolongan: '1I-5', gajiPokok: '1830000' },
        { namaGolongan: '1I-6', gajiPokok: '1980000' },
        { namaGolongan: '2S-0', gajiPokok: '1980000' },
        { namaGolongan: '2S-1', gajiPokok: '2080000' },
        { namaGolongan: '2S-2', gajiPokok: '2180000' },
        { namaGolongan: '2S-3', gajiPokok: '2280000' },
        { namaGolongan: '2S-4', gajiPokok: '2380000' },
        { namaGolongan: '2S-5', gajiPokok: '2480000' },
        { namaGolongan: '2S-6', gajiPokok: '2580000' },
        { namaGolongan: '2A-0', gajiPokok: '2580000' },
        { namaGolongan: '2A-1', gajiPokok: '2680000' },
        { namaGolongan: '2A-2', gajiPokok: '2780000' },
        { namaGolongan: '2A-3', gajiPokok: '2880000' },
        { namaGolongan: '2A-4', gajiPokok: '2980000' },
        { namaGolongan: '2A-5', gajiPokok: '3080000' },
        { namaGolongan: '2A-6', gajiPokok: '3180000' },
        { namaGolongan: '2I-0', gajiPokok: '3180000' },
        { namaGolongan: '2I-1', gajiPokok: '3280000' },
        { namaGolongan: '2I-2', gajiPokok: '3380000' },
        { namaGolongan: '2I-3', gajiPokok: '3480000' },
        { namaGolongan: '2I-4', gajiPokok: '3580000' },
        { namaGolongan: '2I-5', gajiPokok: '3680000' },
        { namaGolongan: '2I-6', gajiPokok: '3780000' },
        { namaGolongan: '3S-0', gajiPokok: '3780000' },
        { namaGolongan: '3S-1', gajiPokok: '3880000' },
        { namaGolongan: '3S-2', gajiPokok: '3980000' },
        { namaGolongan: '3S-3', gajiPokok: '4080000' },
        { namaGolongan: '3S-4', gajiPokok: '4180000' },
        { namaGolongan: '3S-5', gajiPokok: '4280000' },
        { namaGolongan: '3S-6', gajiPokok: '4380000' },
        { namaGolongan: '3A-0', gajiPokok: '4380000' },
        { namaGolongan: '3A-1', gajiPokok: '4480000' },
        { namaGolongan: '3A-2', gajiPokok: '4580000' },
        { namaGolongan: '3A-3', gajiPokok: '4680000' },
        { namaGolongan: '3A-4', gajiPokok: '4780000' },
        { namaGolongan: '3A-5', gajiPokok: '4880000' },
        { namaGolongan: '3A-6', gajiPokok: '4980000' },
        { namaGolongan: '3I-0', gajiPokok: '4980000' },
        { namaGolongan: '3I-1', gajiPokok: '5080000' },
        { namaGolongan: '3I-2', gajiPokok: '5180000' },
        { namaGolongan: '3I-3', gajiPokok: '5280000' },
        { namaGolongan: '3I-4', gajiPokok: '5380000' },
        { namaGolongan: '3I-5', gajiPokok: '5480000' },
        { namaGolongan: '3I-6', gajiPokok: '5580000' },
        { namaGolongan: '4S-0', gajiPokok: '5580000' },
        { namaGolongan: '4S-1', gajiPokok: '5630000' },
        { namaGolongan: '4S-2', gajiPokok: '5680000' },
        { namaGolongan: '4S-3', gajiPokok: '5730000' },
        { namaGolongan: '4S-4', gajiPokok: '5780000' },
        { namaGolongan: '4S-5', gajiPokok: '5830000' },
        { namaGolongan: '4S-6', gajiPokok: '5880000' },
        { namaGolongan: '4A-0', gajiPokok: '5880000' },
        { namaGolongan: '4A-1', gajiPokok: '5930000' },
        { namaGolongan: '4A-2', gajiPokok: '5980000' },
        { namaGolongan: '4A-3', gajiPokok: '6030000' },
        { namaGolongan: '4A-4', gajiPokok: '6080000' },
        { namaGolongan: '4A-5', gajiPokok: '6130000' },
        { namaGolongan: '4A-6', gajiPokok: '6180000' },
        { namaGolongan: '4I-0', gajiPokok: '6180000' },
        { namaGolongan: '4I-1', gajiPokok: '6230000' },
        { namaGolongan: '4I-2', gajiPokok: '6280000' },
        { namaGolongan: '4I-3', gajiPokok: '6330000' },
        { namaGolongan: '4I-4', gajiPokok: '6380000' },
        { namaGolongan: '4I-5', gajiPokok: '6430000' },
        { namaGolongan: '4I-6', gajiPokok: '6480000' },
        { namaGolongan: '5I-0', gajiPokok: '6480000' },
        { namaGolongan: '5I-1', gajiPokok: '6530000' },
        { namaGolongan: '5I-2', gajiPokok: '6580000' },
        { namaGolongan: '5I-3', gajiPokok: '6630000' },
        { namaGolongan: '5I-4', gajiPokok: '6680000' },
        { namaGolongan: '5I-5', gajiPokok: '6730000' },
        { namaGolongan: '5I-6', gajiPokok: '6780000' },
    ];

    for (const golongan of golonganData) {
        await prisma.golongan.create({
            data: golongan,
        });
    }

    const webSettingsVariables = [
        {name: 'waktuMasukMaksimal', value: '07:25:00.000'},
        {name: 'waktuPulang', value: '16:00:00.000'},
        {name: 'potonganYangDiToleransi', value: '60000'},
        {name: 'potonganKeterlambatanPerMenit', value: '1000'},
        {name: 'potonganKetidakhadiranPerHari', value: '25000'},
        {name: 'jumlahJamPerHari', value: '8'},
    ]

    for (const variable of webSettingsVariables) {
        await prisma.webSettings.create({
            data: variable,
        });
    }

    const pegawai = await prisma.pegawai.create({
        data: {
            namaPegawai: 'Admin',
            pendidikan: 'S1',
            golonganId: 1,
            // pin: 1234,
            mulaiKerja: new Date(),
        },
    })

    const user = await prisma.user.create({
        data: {
            username: 'admin',
            password: 'adminsai098',
            role: 'ADMIN',
            pegawaiId: pegawai.id,
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })