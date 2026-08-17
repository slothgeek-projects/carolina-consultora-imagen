import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";
import { cookies } from "@/data/legal";

export const metadata: Metadata = {
  title: cookies.metaTitle,
  description: cookies.metaDescription,
  alternates: { canonical: `/${cookies.slug}` },
  openGraph: {
    type: "article",
    url: `/${cookies.slug}`,
    title: cookies.metaTitle,
    description: cookies.metaDescription,
  },
  robots: { index: true, follow: true },
};

export default function Cookies() {
  return <LegalPage doc={cookies} />;
}
