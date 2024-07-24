import { getAbsensiById } from '@/action/user';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import EditDataAbsensi from '@/components/form/EditAbsensiForm';
import { User } from '@prisma/client';

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

    return (
        
        <div className="pt-28 px-[10vw]">
            <div className='py-8'>
                <h1 className="font-bold text-3xl">Edit Data Absensi</h1>
                    <EditDataAbsensi absensiData={absensiData} />
            </div>
        </div>
    ) 
}

export default EditPage;
