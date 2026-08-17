import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  CONTACT_EMAIL,
  LEGAL_UPDATED,
  legalDocs,
  type LegalDoc,
} from "@/data/legal";
import { WHATSAPP_URL } from "@/lib/seo";

const AGENDA_URL = "/agendar";

/* Los tres documentos legales comparten estructura: encabezado, índice lateral
   y secciones numeradas. Componente de servidor: no hay estado ni efectos, así
   el HTML llega completo al rastreador y no se envía JS extra al cliente. */

/** "¿Qué son las cookies?" → "que-son-las-cookies" (id estable para el índice). */
function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita los acentos que NFD ya separó
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* El correo de contacto aparece dentro de párrafos de texto plano; en vez de
   meter markup en data/legal.ts, se enlaza aquí al renderizar. */
function withEmailLink(text: string) {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;

  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a
            key={i}
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-mid underline underline-offset-4 hover:text-ink transition-colors"
          >
            {CONTACT_EMAIL}
          </a>,
          part,
        ]
  );
}

const paragraphClass =
  "font-body font-light text-[15px] md:text-base leading-[1.9] text-ink/75";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      {/* ── HEADER ──────────────────────────────────────────────── */}
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
            <Link
              href={AGENDA_URL}
              className="font-body text-[10px] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-mid hover:border-mid transition-colors duration-200"
            >
              Agendar →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* ── TÍTULO ────────────────────────────────────────────── */}
        <div className="max-w-3xl pt-14 md:pt-20 pb-10 md:pb-14 border-b border-edge">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-mid mb-5">
            Legal
          </p>
          <h1 className="font-heading text-[34px] md:text-[46px] leading-[1.15] text-ink mb-5">
            {doc.title}
          </h1>
          <p className="font-body font-light text-[16px] md:text-[17px] leading-[1.8] text-ink/70">
            {doc.intro}
          </p>
          <p className="font-body text-[11px] tracking-[0.12em] uppercase text-ink/40 mt-7">
            Última actualización: {LEGAL_UPDATED}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 py-12 md:py-16">
          {/* ── ÍNDICE ──────────────────────────────────────────── */}
          <nav
            aria-label="Contenido de la página"
            className="lg:w-56 lg:shrink-0 lg:sticky lg:top-12 lg:self-start"
          >
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-ink/40 mb-4">
              Contenido
            </p>
            <ol className="list-none space-y-1">
              {doc.sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="block font-body font-light text-[13px] leading-[1.6] text-ink/60 hover:text-ink transition-colors py-1.5"
                  >
                    <span className="text-ink/30 tabular-nums mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ── SECCIONES ───────────────────────────────────────── */}
          <article className="max-w-3xl flex-1 space-y-12 md:space-y-14">
            {doc.sections.map((section, i) => (
              <section
                key={section.heading}
                id={slugify(section.heading)}
                className="scroll-mt-12"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-body text-[11px] tracking-[0.12em] text-mid tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-[22px] md:text-[26px] leading-[1.3] text-ink">
                    {section.heading}
                  </h2>
                </div>

                {section.body?.map((paragraph, j) => (
                  <p key={j} className={`${paragraphClass} mb-4 last:mb-0`}>
                    {withEmailLink(paragraph)}
                  </p>
                ))}

                {section.items && (
                  <dl className="mt-2 space-y-6">
                    {section.items.map((item) => (
                      <div key={item.term} className="border-l border-edge pl-5">
                        <dt className="font-body text-[13px] tracking-[0.04em] uppercase text-ink mb-2">
                          {item.term}
                        </dt>
                        <dd className={paragraphClass}>{withEmailLink(item.desc)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}

            {/* ── CTA DE CIERRE ─────────────────────────────────── */}
            <aside className="border-t border-edge pt-10">
              <p className="font-heading text-[20px] md:text-[22px] text-ink mb-3">
                ¿Tenés dudas sobre este documento?
              </p>
              <p className={`${paragraphClass} mb-6`}>
                Escribinos y te respondemos personalmente, sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-4 bg-ink text-white font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200"
                >
                  Escribir por WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex justify-center items-center px-8 py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-colors duration-200"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </aside>
          </article>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-ink">
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
              {legalDocs.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${other.slug}`}
                  aria-current={other.slug === doc.slug ? "page" : undefined}
                  className={`font-body font-light text-xs transition-colors py-2 ${
                    other.slug === doc.slug
                      ? "text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {other.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
