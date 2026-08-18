'use client';

import { useAgenda } from '@/context/AgendaContext';
import BackButton from '@/features/agenda/components/backButton';
import { Button, ProgressBar } from '@heroui/react';
import { ArrowUturnLeftIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';


export default function Footer() {
    const { step, loadingSchedule, sendingForm, canSendForm, submitForm, clearSelections } = useAgenda();

    return (
        <div className='fixed bottom-0 left-0 right-0 z-20 opacity-100'>
            <ProgressBar isIndeterminate={loadingSchedule || sendingForm} aria-label="Loading" className="w-full rounded-none" size='sm'>
                <ProgressBar.Track className='rounded-none'>
                    <ProgressBar.Fill className='bg-o-blue-500' />
                </ProgressBar.Track>
            </ProgressBar>
            <div className='bg-background'>
                <div className='mx-auto p-4 flex w-full max-w-2xl  items-center justify-between h-[68px]'>
                    {
                        step < 7 && (
                            <>
                                <BackButton />
                                <Button
                                    className="bg-ink hover:text-mid rounded-none"
                                    isDisabled={!canSendForm || step !== 6}
                                    onPress={() => submitForm?.()}
                                >
                                    <CalendarDaysIcon className='w-6 h-6' />
                                    Agendar cita
                                </Button>
                            </>
                        )
                    }
                    {
                        step === 7 && (
                            <Button
                                onPress={() => clearSelections()}
                                className="w-full bg-gradient-to-r from-teal-500 to-primary hover:from-teal-600 hover:to-primary text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <ArrowUturnLeftIcon className='w-5 h-5' />
                                Volver al Inicio
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}