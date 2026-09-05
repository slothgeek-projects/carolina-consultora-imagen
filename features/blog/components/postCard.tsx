import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/definitions";
import { formatearFecha } from "@/features/blog/formato";

/* La tarjeta destacada ocupa el ancho completo con la imagen a la izquierda;
   el resto son tarjetas de columna. Misma pieza para no duplicar el markup. */

export default function PostCard({
  post,
  destacada = false,
}: {
  post: Post;
  destacada?: boolean;
}) {
  const meta = [
    formatearFecha(post.fecha),
    post.tiempoLectura ? `${post.tiempoLectura} min de lectura` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className={`group bg-white h-full ${
        destacada ? "md:grid md:grid-cols-2 md:items-center md:gap-10" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden bg-[#f4f4f4] ${
            destacada ? "aspect-[4/3]" : "aspect-[3/2]"
          }`}
        >
          {post.imagen ? (
            <Image
              src={post.imagen.url}
              alt={post.imagen.alt || post.titulo}
              fill
              sizes={destacada ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={destacada}
            />
          ) : null}
        </div>
      </Link>

      <div className={destacada ? "pt-6 md:pt-0" : "pt-5"}>
        {post.categoria && (
          <Link
            href={`/blog/categoria/${post.categoria.slug}`}
            className="font-body text-[10px] tracking-[0.18em] uppercase text-mid hover:text-ink transition-colors"
          >
            {post.categoria.nombre}
          </Link>
        )}

        <h3
          className={`font-heading font-normal text-ink leading-snug mt-3 mb-3 ${
            destacada ? "text-[26px] md:text-[34px]" : "text-[21px]"
          }`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-mid transition-colors duration-200"
          >
            {post.titulo}
          </Link>
        </h3>

        {post.extracto && (
          <p
            className={`font-body font-light leading-[1.8] text-ink/70 ${
              destacada ? "text-[15px] md:text-base" : "text-[14px]"
            }`}
          >
            {post.extracto}
          </p>
        )}

        {meta && (
          <p className="font-body text-[11px] tracking-[0.08em] uppercase text-ink/40 mt-5">
            {meta}
          </p>
        )}
      </div>
    </article>
  );
}
