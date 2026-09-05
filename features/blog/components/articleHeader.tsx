import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/definitions";
import { formatearFecha } from "@/features/blog/formato";

export default function ArticleHeader({ post }: { post: Post }) {
  return (
    <header className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
        {post.categoria && (
          <Link
            href={`/blog/categoria/${post.categoria.slug}`}
            className="font-body text-[10px] tracking-[0.2em] uppercase text-mid hover:text-ink transition-colors"
          >
            {post.categoria.nombre}
          </Link>
        )}
        <span className="font-body text-[11px] tracking-[0.08em] uppercase text-ink/40">
          <time dateTime={post.fecha}>{formatearFecha(post.fecha)}</time>
          {post.tiempoLectura ? ` · ${post.tiempoLectura} min de lectura` : ""}
        </span>
      </div>

      <h1 className="font-heading text-[34px] md:text-[46px] leading-[1.15] text-ink mb-6">
        {post.titulo}
      </h1>

      {post.extracto && (
        <p className="font-body font-light text-[16px] md:text-[17px] leading-[1.8] text-ink/70">
          {post.extracto}
        </p>
      )}

      {post.imagen && (
        <div className="relative aspect-[16/9] mt-10 md:mt-12 bg-[#f4f4f4] overflow-hidden">
          <Image
            src={post.imagen.url}
            alt={post.imagen.alt || post.titulo}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
