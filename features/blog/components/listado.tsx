import type { Categoria, ListadoPosts } from "@/lib/definitions";
import CategoriaChips from "@/features/blog/components/categoriaChips";
import Paginacion from "@/features/blog/components/paginacion";
import PostGrid from "@/features/blog/components/postGrid";

/* Cuerpo compartido por /blog y /blog/categoria/[slug]: el filtro por categoría
   solo cambia el título, la ruta base de la paginación y el chip activo. */

export default function Listado({
  titulo,
  descripcion,
  listado,
  categorias,
  categoriaActiva,
  base,
  page,
}: {
  titulo: string;
  descripcion: string;
  listado: ListadoPosts;
  categorias: Array<Categoria>;
  categoriaActiva?: string;
  base: string;
  page: number;
}) {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
      <div className="max-w-3xl pt-14 md:pt-20 pb-10 md:pb-12">
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-mid mb-5">
          Blog
        </p>
        <h1 className="font-heading text-[34px] md:text-[46px] leading-[1.15] text-ink mb-5">
          {titulo}
        </h1>
        <p className="font-body font-light text-[16px] md:text-[17px] leading-[1.8] text-ink/70">
          {descripcion}
        </p>
      </div>

      <div className="pb-10 md:pb-14 border-b border-edge">
        <CategoriaChips categorias={categorias} activa={categoriaActiva} />
      </div>

      <div className="py-12 md:py-16">
        {/* El destacado solo encabeza la primera página del listado general. */}
        <PostGrid posts={listado.posts} conDestacado={!categoriaActiva && page === 1} />
        <Paginacion base={base} page={page} totalPages={listado.totalPages} />
      </div>
    </main>
  );
}
