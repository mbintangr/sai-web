import { fetchAllPegawai } from '@/action/pegawai';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import AddDataAbsensi from '@/components/form/AddAbsensiForm';
import { User } from '@prisma/client';

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
        <div className="pt-28 px-[10vw]">
            <div className='py-8'>
                <h1 className="font-bold text-3xl">Add Data Absensi</h1>
                <AddDataAbsensi dataPegawai={dataPegawai} />
            </div>
        </div>
    );
};

export default CreateAbsensiPage;
