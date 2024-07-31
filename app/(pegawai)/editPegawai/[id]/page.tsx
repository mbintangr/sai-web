import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { getPegawaiById } from '@/action/pegawai';
import EditDataPegawai from '@/components/form/EditPegawaiForm';
import { fetchAllGolongan } from '@/action/golongan';
import { User } from '@prisma/client';

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

        <div className="pt-28 px-[10vw]">
            <div className='py-8'>
                <h1 className="font-bold text-3xl">Edit Pegawai</h1>
                <EditDataPegawai dataPegawai={dataPegawai} dataGolongan={dataGolongan} />
            </div>
        </div>
    )
}

export default EditPegawaiPage;
