'use client';

import { useAgenda } from '@/context/AgendaContext';
import { Button } from '@heroui/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const CONTACT_STEP: Record<string, number> = {
    'professional': 6,
    'service': 6,
    'service-without-professional': 5,
};

export default function BackButton() {
    const { step, account, goBack } = useAgenda();

    if (!account) return null;

    return (
        <Button
            variant="outline"
            size="sm"
            onPress={goBack}
            className="self-start text-foreground rounded-none"
            aria-label="Volver al paso anterior"
            isDisabled={step < 1}
        >
            <ChevronLeftIcon className="w-4 h-4" />
            Atrás
        </Button>
    );
}
