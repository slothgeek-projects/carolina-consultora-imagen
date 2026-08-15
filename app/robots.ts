import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    /* /agendar no se bloquea aquí a propósito: lleva noindex en su metadata, y
       un Disallow impediría que Google leyera esa etiqueta — la URL quedaría
       indexada "a ciegas", solo con el enlace y sin snippet. Rastreable +
       noindex es la combinación que realmente la saca del índice. */
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
