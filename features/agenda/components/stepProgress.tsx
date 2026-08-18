'use client';

import { useAgenda } from '@/context/AgendaContext';
import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const TOTAL_STEPS: Record<string, number> = {
    'professional': 6,
    'service': 6,
    'service-without-professional': 5,
};

export default function StepProgress() {
    const { step, account } = useAgenda();

    if (!account || step === 0) return null;

    const totalSteps = TOTAL_STEPS[account.theme] ?? 6;

    // No mostrar en el paso de confirmación final
    if (step > totalSteps) return null;

    return (
        <div className="flex items-center justify-center" aria-label={`Paso ${step} de ${totalSteps}`}>
            {Array.from({ length: totalSteps }, (_, i) => {
                const stepNumber = i + 1;
                const isCompleted = step > stepNumber;
                const isActive = step === stepNumber;

                return (
                    <div key={stepNumber} className="flex items-center">
                        <div
                            className={clsx(
                                'w-7 h-7 rounded-none flex items-center justify-center text-xs transition-all duration-200 border-2',
                                {
                                    'bg-primary border-primary text-ink scale-110 shadow-md': isActive,
                                    'bg-ink border-primary text-foreground opacity-70': isCompleted,
                                    'bg-transparent border-o-gray-200 text-o-gray-300': !isActive && !isCompleted,
                                }
                            )}
                            aria-current={isActive ? 'step' : undefined}
                        >
                            {isCompleted
                                ? <CheckIcon className="w-4 h-4 text-white" />
                                : <span>{stepNumber}</span>
                            }
                        </div>
                        {stepNumber < totalSteps && (
                            <div
                                className={clsx(
                                    'h-0.5 w-6 sm:w-8 transition-all duration-300',
                                    step > stepNumber ? 'bg-primary opacity-70' : 'bg-o-gray-200'
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
