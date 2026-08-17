import type { MetadataRoute } from "next";
import { legalDocs } from "@/data/legal";
import { SITE_URL } from "@/lib/seo";

/* La home carga todo el contenido comercial; /agendar queda fuera por llevar
   noindex. Las legales sí se listan, con prioridad baja: no compiten por
   tráfico, pero son señal de confianza del negocio. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/og-image.jpg`,
        `${SITE_URL}/hero/quiensoy.png`,
        `${SITE_URL}/hero/online.webp`,
      ],
    },
    ...legalDocs.map((doc) => ({
      url: `${SITE_URL}/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
