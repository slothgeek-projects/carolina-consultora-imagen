import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Landing de una sola página indexable. /agendar queda fuera por llevar
   noindex, y las legales (/privacidad, /terminos, /cookies) todavía no
   existen — se agregan aquí cuando se creen. */
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
  ];
}
