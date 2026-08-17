import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { privacidad } from "@/data/legal";

export const metadata: Metadata = {
  title: privacidad.metaTitle,
  description: privacidad.metaDescription,
  alternates: { canonical: `/${privacidad.slug}` },
  openGraph: {
    type: "article",
    url: `/${privacidad.slug}`,
    title: privacidad.metaTitle,
    description: privacidad.metaDescription,
  },
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return <LegalPage doc={privacidad} />;
}
