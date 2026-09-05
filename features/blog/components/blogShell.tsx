import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legalDocs } from "@/data/legal";

const AGENDA_URL = "/agendar";

/* Cabecera y pie compartidos por /blog y /blog/[slug]. Misma estructura que
   LegalPage: el nav de la home es de anclas y no sirve fuera de ella. */

export function BlogHeader({ volverA = "/" }: { volverA?: string }) {
  return (
    <header className="border-b border-edge">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 sm:py-5 flex justify-between items-center gap-4">
        <Link href="/" className="font-heading text-[17px] sm:text-[18px] text-ink">
          Carolina Salazar
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={volverA}
            className="hidden sm:inline-flex items-center gap-2 font-body text-[10px] tracking-[0.14em] uppercase text-ink hover:text-mid transition-colors duration-200"
          >
            <ArrowLeft size={13} strokeWidth={1.5} aria-hidden />
            {volverA === "/" ? "Volver al inicio" : "Volver al blog"}
          </Link>
          <Link
            href={AGENDA_URL}
            className="font-body text-[10px] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-mid hover:border-mid transition-colors duration-200"
          >
            Agendar →
          </Link>
        </div>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="bg-ink mt-20 md:mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="font-body font-light text-xs text-white/50 order-2 md:order-1">
            © 2025 Piel Pantera Collections. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 order-1 md:order-2">
            <Link
              href="/"
              className="font-body font-light text-xs text-white/50 hover:text-white transition-colors py-2"
            >
              Inicio
            </Link>
            <Link
              href="/blog"
              className="font-body font-light text-xs text-white/50 hover:text-white transition-colors py-2"
            >
              Blog
            </Link>
            {legalDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/${doc.slug}`}
                className="font-body font-light text-xs text-white/50 hover:text-white transition-colors py-2"
              >
                {doc.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
