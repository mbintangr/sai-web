import React, { useEffect, useState } from 'react';
import SettingsForm from '@/components/form/SettingsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getReportParameters, getSettingsValueByName } from '@/action/settings';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

const Settings = async () => {
    const session = await getSession();
    const user = session?.user;
    
    if (!user) {
        redirect('/login');
    } else if ((user as User).role !== 'ADMIN') {
        redirect('/');
    }

    const waktuMasukMaksimal = await getSettingsValueByName('waktuMasukMaksimal');
    const waktuPulang = await getSettingsValueByName('waktuPulang');

    const reportParameters = await getReportParameters();

    return (
        <div className="pt-20 sm:pt-28 px-[10vw]">
            <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
                <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Settings!</CardTitle>
                        <CardDescription>Change the system settings!</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <SettingsForm waktuMasukMaksimal={waktuMasukMaksimal} waktuPulang={waktuPulang} reportParameters={reportParameters} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Settings;