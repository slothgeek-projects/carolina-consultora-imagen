"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const AGENDA_URL = "/agendar";

const links = [
  { label: "Servicios", href: "#servicios" },
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
      <Link href="/" className="font-heading text-[18px] text-ink">
        Carolina Salazar{" "}
      </Link>
      <ul className="hidden md:flex gap-7 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={linkClass}>{l.label}</a>
          </li>
        ))}
      </ul>
      <Link href={AGENDA_URL} className={`hidden md:inline ${ctaClass}`}>
        Agendar →
      </Link>
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 text-ink"
        aria-label="Toggle menu"
      >
        <span className="block w-5 h-px bg-current mb-1.5" />
        <span className="block w-5 h-px bg-current mb-1.5" />
        <span className="block w-5 h-px bg-current" />
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
      <nav className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-8 lg:px-10 py-5">
        <NavInner onMenuToggle={toggleMenu} />
      </nav>

      {/* Sticky nav — fades in on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-8 lg:px-10 py-4 bg-white border-b border-edge transition-all duration-200 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        aria-hidden={!scrolled}
      >
        <NavInner onMenuToggle={toggleMenu} />
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-edge px-8 pt-20 pb-8 flex flex-col gap-4">
          <button
            onClick={closeMenu}
            className="absolute top-5 right-8 text-ink text-xl"
            aria-label="Cerrar menú"
          >
            <span aria-hidden="true">✕</span>
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="font-body text-[11px] tracking-[0.14em] uppercase text-ink py-3 border-b border-edge"
            >
              {l.label}
            </a>
          ))}
          <Link
            href={AGENDA_URL}
            onClick={closeMenu}
            className="mt-2 text-center py-4 bg-ink text-white font-body text-[10px] tracking-[0.14em] uppercase"
          >
            Agendar mi asesoría
          </Link>
        </div>
      )}
    </>
  );
}
