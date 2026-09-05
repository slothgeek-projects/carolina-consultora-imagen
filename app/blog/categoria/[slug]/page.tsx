import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogFooter, BlogHeader } from "@/features/blog/components/blogShell";
import Listado from "@/features/blog/components/listado";
import { getCategoria, getCategorias, getPosts } from "@/lib/wp";
import { PERSON_NAME } from "@/lib/seo";

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

function aPagina(valor: string | undefined): number {
  const n = Number(valor);
  return Number.isInteger(n) && n > 1 ? n : 1;
}

function descripcionDe(nombre: string) {
  return `Artículos de ${nombre.toLowerCase()}: guías prácticas de imagen personal y profesional por ${PERSON_NAME}.`;
}

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoria(slug);

  if (!categoria) return { title: "Categoría no encontrada", robots: { index: false } };

  const page = aPagina((await searchParams).page);
  const ruta = `/blog/categoria/${slug}`;
  const canonical = page > 1 ? `${ruta}?page=${page}` : ruta;

  return {
    title: page > 1 ? `${categoria.nombre} — página ${page}` : categoria.nombre,
    description: descripcionDe(categoria.nombre),
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${categoria.nombre} | Blog de ${PERSON_NAME}`,
      description: descripcionDe(categoria.nombre),
    },
  };
}

export default async function CategoriaPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const page = aPagina((await searchParams).page);

  /* La REST filtra por id de término, no por slug: primero se resuelve la
     categoría y solo después se piden sus artículos. */
  const categoria = await getCategoria(slug);
  if (!categoria) notFound();

  const [listado, categorias] = await Promise.all([
    getPosts({ page, categoriaId: categoria.id }),
    getCategorias(),
  ]);

  return (
    <>
      <BlogHeader volverA="/blog" />
      <Listado
        titulo={categoria.nombre}
        descripcion={descripcionDe(categoria.nombre)}
        listado={listado}
        categorias={categorias}
        categoriaActiva={categoria.slug}
        base={`/blog/categoria/${categoria.slug}`}
        page={page}
      />
      <BlogFooter />
    </>
  );
}
