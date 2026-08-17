"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Briefcase,
  Building2,
  Check,
  Layers,
  Palette,
  Sparkles,
  X,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { getLenis } from "./LenisProvider";
import { servicios, type Servicio, type ServicioIcon } from "@/data/services";

const AGENDA_URL = "/agendar";

/* Debe coincidir con la duración de .modal-overlay[data-cerrando] en globals.css:
   es el tiempo que el modal sigue montado mientras se anima la salida. */
const CIERRE_MS = 200;

const ICONS: Record<ServicioIcon, LucideIcon> = {
  palette: Palette,
  layers: Layers,
  sparkles: Sparkles,
  briefcase: Briefcase,
  building: Building2,
  shoppingbag: ShoppingBag,
};

/* Celdas vacías que quedan en la última fila con `columnas` columnas. */
function huecos(columnas: number) {
  const sobran = (columnas - (servicios.length % columnas)) % columnas;
  return Array.from({ length: sobran }, (_, i) => i);
}

function ServicioIconGlyph({ name, size }: { name: ServicioIcon; size: number }) {
  const Glyph = ICONS[name];
  return <Glyph size={size} strokeWidth={1.2} />;
}

/* ── Modal ──────────────────────────────────────────────────────────────
   Se renderiza en un portal a <body>: .section-animate aplica transform y un
   ancestro con transform convierte position:fixed en relativo a él. */
function ServicioModal({
  servicio,
  cerrando,
  onClose,
}: {
  servicio: Servicio;
  cerrando: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Lenis intercepta la rueda del mouse; overflow:hidden solo detiene el
       scroll táctil. Hacen falta los dos para congelar el fondo. */
    const lenis = getLenis();
    lenis?.stop();

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    panelRef.current?.focus();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      lenis?.start();
    };
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      /* Focus trap: el foco no debe escaparse a la página de atrás. */
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  return (
    <div
      className="modal-overlay fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      data-cerrando={cerrando}
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`servicio-${servicio.slug}-title`}
        tabIndex={-1}
        data-cerrando={cerrando}
        /* data-lenis-prevent: con lenis.stop() Lenis hace preventDefault() sobre
           todo evento de rueda, lo que también mataría el scroll nativo de este
           panel. El atributo lo excluye de su manejo (lenis.mjs:580). */
        data-lenis-prevent
        className="modal-panel relative w-full sm:max-w-2xl max-h-[90dvh] sm:max-h-[85dvh] overflow-y-auto overscroll-contain bg-white border border-edge shadow-2xl outline-none"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 flex items-center justify-center bg-white border border-edge text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors duration-200 cursor-pointer"
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        <div className="p-7 sm:p-10">
          <span className="text-ink mb-5 block">
            <ServicioIconGlyph name={servicio.icon} size={30} />
          </span>

          <h3
            id={`servicio-${servicio.slug}-title`}
            className="font-heading text-[26px] sm:text-[32px] font-normal text-ink leading-tight pr-10"
          >
            {servicio.title}
          </h3>
          {servicio.subtitle && (
            <p className="font-body font-light text-xs text-subtle tracking-wide mt-1.5">
              {servicio.subtitle}
            </p>
          )}
          {servicio.priceLabel && (
            <p className="font-heading text-[30px] font-normal text-ink mt-3">
              {servicio.priceLabel}
              <span className="font-body font-light text-[10px] tracking-[0.14em] uppercase text-subtle ml-2 align-middle">
                Precio final
              </span>
            </p>
          )}

          <div className="w-7 h-px bg-ink my-6" />

          <p className="font-body font-light text-[15px] leading-[1.9] mb-7">
            {servicio.desc}
          </p>

          <ul className="space-y-3 mb-8">
            {servicio.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">
                  <Check size={16} strokeWidth={1.5} className="text-ink" />
                </span>
                <span className="font-body font-light text-sm leading-[1.7]">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={AGENDA_URL}
            className="block w-full text-center py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-all duration-200"
          >
            Agendar mi asesoría
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Cuadrícula ─────────────────────────────────────────────────────────
   El truco de gap:1px sobre fondo gris dibuja las separaciones entre
   tarjetas sin bordes dobles; se mantiene igual que antes. */
export default function ServiciosGrid() {
  const [activo, setActivo] = useState<Servicio | null>(null);
  const [cerrando, setCerrando] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const cierreRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (cierreRef.current) clearTimeout(cierreRef.current);
  }, []);

  const cerrar = useCallback(() => {
    if (cierreRef.current) return; // ya se está cerrando
    setCerrando(true);
    cierreRef.current = setTimeout(() => {
      cierreRef.current = null;
      setCerrando(false);
      setActivo(null);
      triggerRef.current?.focus();
    }, CIERRE_MS);
  }, []);

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "1px", background: "#E0E0E0" }}
      >
        {servicios.map((s, i) => (
          <AnimatedSection key={s.slug} delay={i * 60} className="h-full">
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActivo(s);
              }}
              aria-haspopup="dialog"
              className="w-full text-left bg-white p-7 sm:p-8 md:p-10 hover:bg-[#fafafa] transition-colors duration-200 h-full flex flex-col cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
            >
              <span className="text-ink mb-5 block">
                <ServicioIconGlyph name={s.icon} size={26} />
              </span>
              <h3 className="font-body font-medium text-[11px] tracking-[0.12em] uppercase text-ink mb-1">
                {s.title}
              </h3>
              {s.subtitle && (
                <p className="font-body font-light text-[11px] text-subtle leading-snug mb-2">
                  {s.subtitle}
                </p>
              )}
              <p className="font-body font-light text-[15px] md:text-sm leading-[1.8] mt-2">
                {s.desc}
              </p>
              {/* mt-auto: el indicador queda alineado abajo en todas las
                  tarjetas aunque las descripciones tengan distinto largo. */}
              <span className="mt-auto pt-7 inline-flex items-center gap-2 font-body text-[10px] tracking-[0.14em] uppercase text-ink border-b border-ink self-start pb-px group-hover:text-mid group-hover:border-mid transition-colors duration-200">
                Leer más
                <span aria-hidden>+</span>
              </span>
            </button>
          </AnimatedSection>
        ))}
        {/* Las celdas que sobran en la última fila dejarían ver el #E0E0E0 del
            grid como bloques grises macizos. Se rellenan en blanco, y como el
            número de columnas cambia por breakpoint cada relleno solo existe en
            el suyo. Si los servicios llenan la fila, no se renderiza ninguno. */}
        {huecos(2).map((k) => (
          <div key={`hueco-sm-${k}`} className="hidden sm:block lg:hidden bg-white" aria-hidden />
        ))}
        {huecos(3).map((k) => (
          <div key={`hueco-lg-${k}`} className="hidden lg:block bg-white" aria-hidden />
        ))}
      </div>

      {activo &&
        createPortal(
          <ServicioModal servicio={activo} cerrando={cerrando} onClose={cerrar} />,
          document.body
        )}
    </>
  );
}
