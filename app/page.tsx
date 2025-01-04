import { fetchAbsensiByPegawaiId, fetchAllAbsensi } from "@/action/absensi";
import { getUserByUserId } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { redirect } from 'next/navigation';
import React from 'react';
import AbsensiTable from "@/components/table/AbsensiTable";
import { User } from "@prisma/client";
import { fetchAllPegawai, getPegawaiById } from "@/action/pegawai";
import { getSettingsValueByName, getReportParameters } from "@/action/settings";

const Home = async ({ searchParams }: { searchParams: { query?: string, date?: string } }) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect('/login');
  }

  const date = searchParams?.date || "";
  const query = searchParams?.query || "";
  const userId = user?.id as string || "";
  let userData = await getUserByUserId(userId);

  if (!userData) {
    throw new Error("User Data not found");
  }

  let absensiData: any[];
  let pegawaiData: any[]= [];
  if ((user as User).role === 'ADMIN' || (user as User).role === 'PRINCIPAL') {
    absensiData = await fetchAllAbsensi(query, date);
    pegawaiData = await fetchAllPegawai();
  } else {
    absensiData = await fetchAbsensiByPegawaiId(userData.pegawaiId, date);
    pegawaiData.push(await getPegawaiById(userData.pegawaiId));
  }

  const waktuMasukMaksimal = await getSettingsValueByName('waktuMasukMaksimal') || {value: '07:25'};
  const waktuPulang = await getSettingsValueByName('waktuPulang') || {value: '16:00'};

  const reportParameters = await getReportParameters();

  return (
    <div className="pt-20 sm:pt-28 px-[10vw]">
      <div className="py-8">
        <h1 className="font-bold text-2xl sm:text-3xl mb-4 sm:mb-2">Welcome, <span className="text-orange">{userData?.pegawai.namaPegawai}!</span></h1>
        <AbsensiTable absensiData={absensiData} pegawaiData={pegawaiData} waktuMasukMaksimal={waktuMasukMaksimal.value} waktuPulang={waktuPulang.value} reportParameters={reportParameters} role={(user as User).role} />
      </div>
    </div>
  );
};

export default Home;
