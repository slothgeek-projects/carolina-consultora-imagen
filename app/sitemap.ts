import type { MetadataRoute } from "next";
import { legalDocs } from "@/data/legal";
import { SITE_URL } from "@/lib/seo";
import { getCategorias, getPosts } from "@/lib/wp";

/* La home carga todo el contenido comercial; /agendar queda fuera por llevar
   noindex. Las legales sí se listan, con prioridad baja: no compiten por
   tráfico, pero son señal de confianza del negocio.

   El blog se consulta en cada generación del sitemap. Si el WordPress no
   responde, se devuelve el sitemap sin artículos antes que ninguno: perder
   unas URLs temporalmente es mejor que servir un 500 a los rastreadores. */

/* El sitemap recorre TODAS las páginas del listado, así que no puede
   regenerarse en cada petición: se cachea una hora. Los rastreadores no
   necesitan el artículo al segundo, y el WordPress no recibe una ráfaga de
   peticiones cada vez que alguien pide /sitemap.xml. */
export const revalidate = 3600;

async function entradasDelBlog(): Promise<MetadataRoute.Sitemap> {
  try {
    const [{ posts, totalPages }, categorias] = await Promise.all([
      getPosts({ page: 1, revalidate }),
      getCategorias(revalidate),
    ]);

    const restantes = await Promise.all(
      Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
        getPosts({ page: i + 2, revalidate })
      )
    );
    const todos = [...posts, ...restantes.flatMap((p) => p.posts)];

    return [
      {
        url: `${SITE_URL}/blog`,
        lastModified: todos[0] ? new Date(todos[0].fechaModificada) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      ...categorias.map((categoria) => ({
        url: `${SITE_URL}/blog/categoria/${categoria.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
      ...todos.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.fechaModificada || post.fecha),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        ...(post.imagen ? { images: [post.imagen.url] } : {}),
      })),
    ];
  } catch (error) {
    console.error("[sitemap] no se pudo leer el blog de WordPress:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...(await entradasDelBlog()),
    ...legalDocs.map((doc) => ({
      url: `${SITE_URL}/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
