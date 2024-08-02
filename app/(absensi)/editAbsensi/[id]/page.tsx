import { getAbsensiById } from '@/action/absensi';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import EditDataAbsensi from '@/components/form/EditAbsensiForm';
import { User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchAllPegawai } from '@/action/pegawai';

const EditPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

    const id = Number(params.id);
    const absensiData = await getAbsensiById(id);
    const pegawaiData = await fetchAllPegawai();

    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
                <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Edit Data Absensi!</CardTitle>
                        <CardDescription>Edit Existing Absensi Record!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EditDataAbsensi absensiData={absensiData} pegawaiData={pegawaiData} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default EditPage;
