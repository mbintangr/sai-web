import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { getPegawaiById } from '@/action/pegawai';
import EditDataPegawai from '@/components/form/EditPegawaiForm';
import { fetchAllGolongan } from '@/action/golongan';
import { User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const EditPegawaiPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

    const id = Number(params.id);
    const dataPegawai = await getPegawaiById(id);

    const dataGolongan = await fetchAllGolongan();

    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
                <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Add Pegawai!</CardTitle>
                        <CardDescription>Add new Pegawai!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditDataPegawai dataPegawai={dataPegawai} dataGolongan={dataGolongan} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EditPegawaiPage;
