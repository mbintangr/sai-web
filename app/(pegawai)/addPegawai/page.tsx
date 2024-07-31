import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { fetchAllGolongan } from '@/action/golongan';
import AddDataPegawai from '@/components/form/AddPegawaiForm';
import { User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const CreatePegawaiPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

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
                        <AddDataPegawai dataGolongan={dataGolongan} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CreatePegawaiPage;
