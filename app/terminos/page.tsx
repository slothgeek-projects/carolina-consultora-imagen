import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { terminos } from "@/data/legal";

export const metadata: Metadata = {
  title: terminos.metaTitle,
  description: terminos.metaDescription,
  alternates: { canonical: `/${terminos.slug}` },
  openGraph: {
    type: "article",
    url: `/${terminos.slug}`,
    title: terminos.metaTitle,
    description: terminos.metaDescription,
  },
  /* Indexable, pero sin snippet largo: a Google le sirve para resolver la
     confianza del negocio (E-E-A-T), no para competir en resultados. */
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return <LegalPage doc={terminos} />;
}
