import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* Paginación por query string (?page=2). Server Component: los enlaces son
   <a> reales, así el rastreador recorre todas las páginas del listado. */

function href(base: string, page: number) {
  return page <= 1 ? base : `${base}?page=${page}`;
}

const enlaceClass =
  "inline-flex items-center gap-2 font-body text-[10px] tracking-[0.14em] uppercase text-ink hover:text-mid transition-colors duration-200";

export default function Paginacion({
  base,
  page,
  totalPages,
}: {
  base: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginación del blog"
      className="flex items-center justify-between gap-6 mt-16 md:mt-20 pt-8 border-t border-edge"
    >
      {page > 1 ? (
        <Link href={href(base, page - 1)} className={enlaceClass} rel="prev">
          <ArrowLeft size={13} strokeWidth={1.5} aria-hidden />
          Anteriores
        </Link>
      ) : (
        <span />
      )}

      <span className="font-body text-[11px] tracking-[0.12em] uppercase text-ink/40 tabular-nums">
        Página {page} de {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={href(base, page + 1)} className={enlaceClass} rel="next">
          Siguientes
          <ArrowRight size={13} strokeWidth={1.5} aria-hidden />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
