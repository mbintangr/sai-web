import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { fetchAllGolongan } from '@/action/golongan';
import AddDataPegawai from '@/components/form/AddPegawaiForm';

const CreatePegawaiPage = async ({ params }: { params: { id: string } }) => {
    const session = await getSession();
    const user = session?.user;
    if (!user) {
        redirect('/login');
    } else if (user.role !== 'ADMIN') {
        redirect('/');
    }

    const dataGolongan = await fetchAllGolongan();

    return (
        <div className="pt-28 px-[10vw]">
            <div className='py-8'>
                <h1 className="font-bold text-3xl">Add Data Absensi</h1>
                <AddDataPegawai dataGolongan={dataGolongan} />
            </div>
        </div>
    );
};

export default CreatePegawaiPage;
