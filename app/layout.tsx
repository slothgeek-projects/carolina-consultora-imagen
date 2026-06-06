// app/layout.tsx
import type { Metadata } from "next";
import { Antic_Didone } from "next/font/google";
import LenisProvider from '@/app/components/LenisProvider'
import "./globals.css";

const anticDidone = Antic_Didone({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anticDidone",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asesoría de Imagen Personal y Profesional Online — Piel Pantera",
  description:
    "Transforma tu imagen personal y profesional con una asesoría integral online. Análisis corporal, colorimetría y estilo adaptados a tus objetivos. Piel Pantera · Costa Rica.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={anticDidone.variable}>
      <body className="antialiased font-body">
        <LenisProvider>
          {children}
        </LenisProvider></body>
    </html>
  );
}
