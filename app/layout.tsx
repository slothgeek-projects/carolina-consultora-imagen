// app/layout.tsx
import type { Metadata } from "next";
import { Antic_Didone, Montserrat } from "next/font/google";
import LenisProvider from '@/app/components/LenisProvider'
import {
  buildJsonLd,
  KEYWORDS,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const anticDidone = Antic_Didone({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anticDidone",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  /* metadataBase resuelve las rutas relativas de canonical y Open Graph.
     Sin esto, Next falla el build al encontrar un path relativo en og:image. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asesoría de Imagen Online | Costa Rica y Latinoamérica – Carolina Salazar",
    template: `%s | ${PERSON_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Asesoría de imagen",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "/",
    siteName: SITE_NAME,
    title: "Asesoría de Imagen Personal y Profesional Online — Carolina Salazar",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carolina Salazar — consultora de imagen personal y profesional online en Costa Rica y Latinoamérica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesoría de Imagen Personal y Profesional Online — Carolina Salazar",
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
  /* TODO cliente: pegar el código de Google Search Console cuando se verifique
     el dominio y descomentar.
  verification: { google: "..." }, */
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="es-CR" className={`${anticDidone.variable} ${montserrat.variable}`}>
      <body className="antialiased font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LenisProvider>
          {children}
        </LenisProvider></body>
    </html>
  );
}
