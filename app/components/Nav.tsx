"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const AGENDA_URL = "/agendar";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Proceso", href: "#proceso" },
  { label: "FAQ", href: "#faq" },
];

const linkClass =
  "font-body text-[10px] tracking-[0.14em] uppercase text-ink hover:text-mid transition-colors duration-200";
const ctaClass =
  "font-body text-[10px] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-mid hover:border-mid transition-colors duration-200";

function NavInner({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <>
      <Link href="/" className="font-heading text-[17px] sm:text-[18px] text-ink">
        Carolina Salazar
      </Link>
      <ul className="hidden md:flex gap-6 lg:gap-7 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={linkClass}>{l.label}</a>
          </li>
        ))}
      </ul>
      <Link href={AGENDA_URL} className={`hidden md:inline ${ctaClass}`}>
        Agendar →
      </Link>
      {/* -mr-3 compensa el padding extra para que el icono siga alineado al borde */}
      <button
        onClick={onMenuToggle}
        className="md:hidden -mr-3 w-11 h-11 flex items-center justify-center text-ink cursor-pointer"
        aria-label="Abrir menú"
      >
        <Menu size={22} strokeWidth={1.5} aria-hidden />
      </button>
    </>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setOpen((o) => !o), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <>
      {/* Transparent nav — visible at scrollY=0, under sticky */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center gap-4 px-6 md:px-8 lg:px-12 py-4 sm:py-5">
        <NavInner onMenuToggle={toggleMenu} />
      </nav>

      {/* Sticky nav — fades in on scroll. inert mientras está oculto para que
          sus enlaces no reciban foco de teclado ni lectores de pantalla. */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center gap-4 px-6 md:px-8 lg:px-12 py-3 sm:py-4 bg-white border-b border-edge transition-all duration-200 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        aria-hidden={!scrolled}
        inert={!scrolled}
      >
        <NavInner onMenuToggle={toggleMenu} />
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto px-6 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <div className="flex justify-between items-center mb-6">
            <span className="font-heading text-[17px] text-ink">Carolina Salazar</span>
            <button
              onClick={closeMenu}
              className="-mr-3 w-11 h-11 flex items-center justify-center text-ink cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X size={22} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="font-body text-[12px] tracking-[0.14em] uppercase text-ink py-4 border-b border-edge"
            >
              {l.label}
            </a>
          ))}
          <Link
            href={AGENDA_URL}
            onClick={closeMenu}
            className="mt-6 text-center py-4 bg-ink text-white font-body text-[11px] tracking-[0.14em] uppercase"
          >
            Agendar mi asesoría
          </Link>
        </div>
      )}
    </>
  );
}
