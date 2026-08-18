import type { Metadata } from 'next';
import { GetMetadateAccount } from '@/controller/account';
import AgendaPage from '@/features/agenda/agendaPage';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
            <header className="border-b border-edge">
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 sm:py-5 flex justify-between items-center gap-4">
                    <Link href="/" className="font-heading text-[17px] sm:text-[18px] text-ink">
                        Carolina Salazar
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="hidden sm:inline-flex items-center gap-2 font-body text-[10px] tracking-[0.14em] uppercase text-ink hover:text-mid transition-colors duration-200"
                        >
                            <ArrowLeft size={13} strokeWidth={1.5} aria-hidden />
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </header>
            <AgendaPage account={account} />
        </div>
    );
}