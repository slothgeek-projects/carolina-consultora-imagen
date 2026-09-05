import Link from "next/link";
import type { Categoria } from "@/lib/definitions";

/* Filtros del listado. El estado activo se pasa por prop en vez de leer la URL
   en cliente: así el componente sigue siendo de servidor. */

const base =
  "font-body text-[10px] tracking-[0.14em] uppercase px-4 py-2 border transition-colors duration-200";

export default function CategoriaChips({
  categorias,
  activa,
}: {
  categorias: Array<Categoria>;
  activa?: string;
}) {
  if (categorias.length === 0) return null;

  return (
    <nav aria-label="Categorías del blog" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        aria-current={activa ? undefined : "page"}
        className={`${base} ${
          activa
            ? "border-edge text-ink/60 hover:border-ink hover:text-ink"
            : "border-ink bg-ink text-white"
        }`}
      >
        Todos
      </Link>

      {categorias.map((categoria) => {
        const esActiva = categoria.slug === activa;
        return (
          <Link
            key={categoria.id}
            href={`/blog/categoria/${categoria.slug}`}
            aria-current={esActiva ? "page" : undefined}
            className={`${base} ${
              esActiva
                ? "border-ink bg-ink text-white"
                : "border-edge text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            {categoria.nombre}
          </Link>
        );
      })}
    </nav>
  );
}
