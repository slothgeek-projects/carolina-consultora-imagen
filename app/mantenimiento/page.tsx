import type { Metadata } from "next";
import Image from "next/image";

import { InstagramIcon, WhatsappIcon } from "@/app/components/custom-icons";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/seo";

/* Página de mantenimiento. El proxy de la raíz reescribe todo el sitio aquí
   cuando MAINTENANCE_MODE=true; también es visitable en directo, de ahí que
   el noindex viva tanto en el proxy como en estos metadatos. */
export const metadata: Metadata = {
  title: "Sitio en mantenimiento",
  description:
    "Estamos afinando el sitio. Volvemos muy pronto — mientras tanto seguí el trabajo de Carolina Salazar en Instagram.",
  robots: { index: false, follow: false },
};

export default function Mantenimiento() {
  return (
    <main className="relative bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[3fr_2fr] items-stretch lg:min-h-dvh">
        {/* Misma foto art-directed del hero: dos variantes de la MISMA imagen,
            así que fetchPriority en vez de preload para no bajar las dos. */}
        <div className="relative order-1 lg:order-2 w-full aspect-[3/4] sm:aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
          <Image
            src="/hero/bg.png"
            alt="Carolina Salazar, consultora de imagen personal y profesional online en Costa Rica"
            fill
            fetchPriority="high"
            sizes="100vw"
            className="hidden md:block object-cover"
          />
          <Image
            src="/hero/bg-mobile.png"
            alt="Carolina Salazar, consultora de imagen personal y profesional online en Costa Rica"
            fill
            fetchPriority="high"
            sizes="100vw"
            className="md:hidden object-cover"
          />
        </div>

        {/* Left — texto */}
        <div className="flex flex-col justify-center px-6 md:px-8 lg:px-12 pt-10 pb-16 lg:py-32 order-2 lg:order-1 z-10 relative">
          <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-5">
            Sitio en mantenimiento — Carolina Salazar
          </p>
          <h1 className="font-heading text-[clamp(34px,7vw,68px)] font-normal leading-[1.04] tracking-[-0.01em] text-ink mb-7">
            carolinaimage.com{" "}
            <em className="text-mid">Próximamente</em>
          </h1>
          <div className="w-8 h-px bg-ink mb-6" />
          <p className="font-body font-light text-[15px] leading-[1.85] max-w-[460px] mb-8">
            El sitio está en <strong className="font-medium text-ink">mantenimiento por unas horas</strong>{" "}
            mientras preparamos una mejor experiencia. Volvemos muy pronto. Mientras tanto,
            seguí el trabajo en <strong className="font-medium text-ink">Instagram</strong> o
            escribime directamente — las consultas y agendas siguen abiertas por{" "}
            <strong className="font-medium text-ink">WhatsApp</strong>.
          </p>

          {/* CTAs — el sitio no está navegable, así que las dos salidas son
              hacia redes. */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-ink text-white font-body text-[11px] md:text-[10px] tracking-[0.14em] uppercase hover:bg-[#333] transition-colors duration-200"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
              Seguime en Instagram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.14em] uppercase hover:bg-ink hover:text-white transition-colors duration-200"
            >
              <WhatsappIcon className="w-5 h-5" />
              Escribime por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
