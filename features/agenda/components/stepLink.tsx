'use client';

import { useAgenda } from '@/context/AgendaContext';
import { Button } from '@heroui/react';
import { CalendarIcon, GlobeIcon } from 'lucide-react';
import { WhatsappIcon } from '@/app/components/custom-icons';
import { useRouter } from 'next/navigation';

export default function Step0() {
    const { account, setStep, branches, setSelectedBranch } = useAgenda();
    const router = useRouter();

    if (!account) {
        return null;
    }

    const whatsapp = account.whatsapp_sender ? account.whatsapp_sender.sender : account.whatsapp;
    const hasSecondaryActions = whatsapp || account.web;

    const handleStart = () => {
        const activeBranches = (branches ?? []).filter((b) => !b.disabled);
        // Siempre avanzamos a step 1 primero; si hay una sola sucursal la
        // seleccionamos en el mismo batch para que el useEffect la vea con step=1
        // y avance automáticamente a step 2, saltando la pantalla de sucursal.
        setStep(1);
        if (activeBranches.length === 1) {
            setSelectedBranch(activeBranches[0]);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center gap-3 animate-fade-in'>
            {/* CTA primario */}
            <Button
                fullWidth
                className='bg-ink text-white shadow-medium rounded-none h-12'
                size='lg'
                onPress={handleStart}
            >
                <CalendarIcon className='w-6 h-6' />
                <span className="animate-pulse">Agendar Servicio</span>
            </Button>

            {/* Divisor "o también" */}
            {hasSecondaryActions && (
                <div className="flex items-center gap-3 w-full my-1">
                    <div className="h-px flex-1 bg-o-gray-200" />
                    <span className="text-xs text-o-gray-300">o también</span>
                    <div className="h-px flex-1 bg-o-gray-200" />
                </div>
            )}

            {/* Acciones secundarias */}
            {hasSecondaryActions && (
                <div className="flex gap-2 w-full">
                    {whatsapp && (
                        <Button
                            fullWidth
                            size='md'
                            variant="outline"
                            className='border-[#25D366] text-[#25D366] font-semibold'
                            onPress={() => router.push(`https://wa.me/${whatsapp}`)}
                        >
                            <WhatsappIcon className='w-5 h-5' />
                            WhatsApp
                        </Button>
                    )}
                    {account.web && (
                        <Button                           
                            fullWidth
                            size='md'
                            variant="ghost"
                            className='text-o-gray-400 font-semibold'
                            onPress={() => router.push(account.web)}
                        >
                             <GlobeIcon className='w-5 h-5' />
                            Sitio Web
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
