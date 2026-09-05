"use client";

import Link from "next/link";
import { useEffect } from "react";

/* El blog se sirve en SSR contra un WordPress externo: si ese WP no responde,
   esta pantalla evita el error genérico de Next y deja salidas al visitante. */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog] fallo cargando contenido de WordPress:", error);
  }, [error]);

  return (
    <>
      {/* Cabecera mínima escrita aquí en vez de reusar BlogHeader: ese módulo
          importa los textos legales completos y esto es un componente de
          cliente, así que acabarían en el bundle del navegador. */}
      <header className="border-b border-edge">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 sm:py-5">
          <Link href="/" className="font-heading text-[17px] sm:text-[18px] text-ink">
            Carolina Salazar
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32">
      <div className="max-w-xl">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-mid mb-5">
          Blog
        </p>
        <h1 className="font-heading text-[30px] md:text-[38px] leading-[1.2] text-ink mb-5">
          No pudimos cargar los artículos
        </h1>
        <p className="font-body font-light text-[15px] md:text-base leading-[1.9] text-ink/70 mb-8">
          Es un problema temporal al recuperar el contenido. Podés intentarlo de
          nuevo en unos segundos o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="inline-flex justify-center items-center px-8 py-4 bg-ink text-white font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200 cursor-pointer"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex justify-center items-center px-8 py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-colors duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      </main>
    </>
  );
}
