import { fetchAllPegawai } from '@/action/pegawai';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import AddDataAbsensi from '@/components/form/AddAbsensiForm';
import { User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CreateAbsensiPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

    const dataPegawai = await fetchAllPegawai();

    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
                <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Add Data Absensi!</CardTitle>
                        <CardDescription>Add new Absensi Record!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddDataAbsensi dataPegawai={dataPegawai} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreateAbsensiPage;
