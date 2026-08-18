'use client';

import { Account } from '@/lib/definitions';
import { AgendaProvider } from '@/context/AgendaContext';
import AgendaByProfesional from './components/byProfesional';
import AgendaByService from './components/byService';
import AgendaByServiceWithoutProfesional from './components/byServiceWithoutProfesional';

// Mapa de componentes por tema
const AGENDA_COMPONENTS = {
    'professional': AgendaByProfesional,
    'service': AgendaByService,
    'service-without-professional': AgendaByServiceWithoutProfesional,
} as const;

export default function AgendaPage({account}: {account: Account}) {
    if (!account) {
        return <NotFoundPage />
    }

    const AgendaComponent = AGENDA_COMPONENTS[account.theme as keyof typeof AGENDA_COMPONENTS];
    
    if (!AgendaComponent) {
        return <NotFoundPage />
    }

    return (
        <AgendaProvider account={account}>
            <div className="relative w-full">
                <main className='w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center mt-12'>
                    <AgendaComponent />
                </main>
            </div>
        </AgendaProvider>
    )
}

function NotFoundPage() {
    return (
        <div>
            <h1>404</h1>
        </div>
    )
}