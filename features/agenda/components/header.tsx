'use client';

import { useAgenda } from '@/context/AgendaContext';
import { Avatar } from '@heroui/react';
import Image from 'next/image';
import clsx from "clsx";

export default function Header() {
    const { account, step } = useAgenda();

    if (!account) {
        return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string;

    return (
        <div className='flex flex-col items-center justify-center gap-6'>
            <div className={clsx(
                'rounded-full shadow-lg bg-gradient-to-b from-o-blue-500 to-teal-400 flex items-center justify-center transition-all overflow-hidden', {
                "w-[100px] h-[100px] text-[48px]": step !== 0,
                "w-[200px] h-[200px] text-[98px]": step === 0
            })}>
                {
                    account.logo?.url ?
                        <>
                            <Avatar className="w-full h-full">
                                <Avatar.Image src={baseUrl + account.logo.url} width={200} height={200} alt={account.name} className='rounded-full shadow-lg' />
                                <Avatar.Fallback className='font-bold text-[58px] text-foreground'>{account.name.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                        </>
                        :
                        <div className='text-white font-bold'>{account.name.charAt(0)}</div>

                }
            </div>

            <div className={clsx('text-center space-y-2', { "hidden": step > 0 })}>
                <h1 className='text-3xl font-bold'>{account.name}</h1>
                <p className="text-o-gray-300">
                    Te damos la bienvenida a <strong>{account.name}</strong>, acá podrás agendar los servicios que ofrecemos de una manera fácil y rápida.
                </p>
            </div>
        </div>
    )
}

//<div className={clsx({ 'w-[100px] h-[100px]': start }, { 'w-[200px] h-[200px]': !start }, 'rounded-full overflow-hidden mb-4 mx-auto transition-all shadow-white')}>
