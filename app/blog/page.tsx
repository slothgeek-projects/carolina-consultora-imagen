import type { Metadata } from "next";
import { BlogFooter, BlogHeader } from "@/features/blog/components/blogShell";
import Listado from "@/features/blog/components/listado";
import { getCategorias, getPosts } from "@/lib/wp";
import { buildBlogJsonLd, PERSON_NAME } from "@/lib/seo";

type Params = { searchParams: Promise<{ page?: string }> };

const TITULO = "Blog de imagen personal y profesional";
const DESCRIPCION =
  "Colorimetría, morfología, estilo y marca personal explicados sin tecnicismos, para que tu imagen trabaje a favor de tus objetivos.";

/** "2" → 2; cualquier cosa rara → 1. */
function aPagina(valor: string | undefined): number {
  const n = Number(valor);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const page = aPagina((await searchParams).page);
  const canonical = page > 1 ? `/blog?page=${page}` : "/blog";

  return {
    title: page > 1 ? `${TITULO} — página ${page}` : TITULO,
    description: DESCRIPCION,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${TITULO} | ${PERSON_NAME}`,
      description: DESCRIPCION,
    },
  };
}

export default async function BlogPage({ searchParams }: Params) {
  const page = aPagina((await searchParams).page);

  /* Las dos peticiones son independientes: en paralelo para no encadenar
     dos viajes al WordPress en la ruta crítica. */
  const [listado, categorias] = await Promise.all([getPosts({ page }), getCategorias()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBlogJsonLd(listado.posts)).replace(/</g, "\\u003c"),
        }}
      />
      <BlogHeader />
      <Listado
        titulo={TITULO}
        descripcion={DESCRIPCION}
        listado={listado}
        categorias={categorias}
        base="/blog"
        page={page}
      />
      <BlogFooter />
    </>
  );
}
