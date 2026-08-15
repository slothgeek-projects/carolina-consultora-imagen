import type { Metadata } from 'next';
import { GetMetadateAccount } from '@/controller/account';
import AgendaPage from '@/features/agenda/agendaPage';

/* Paso de la app, no contenido de búsqueda: sin texto propio que posicionar y
   con variantes por servicio/profesional que generarían duplicados. noindex
   evita que compita con la home; follow deja pasar el link equity de vuelta. */
export const metadata: Metadata = {
    title: 'Agendar asesoría de imagen',
    robots: { index: false, follow: true },
};

export default async function Agendar() {

    const account = await GetMetadateAccount('piel-pantera')

    return (
        <div>
            <AgendaPage account={account} />
        </div>
    );
}