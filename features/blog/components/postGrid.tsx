import type { Post } from "@/lib/definitions";
import PostCard from "@/features/blog/components/postCard";

/* El artículo marcado como destacado en ACF encabeza la primera página a ancho
   completo. En páginas siguientes no aplica: ahí todo es rejilla uniforme. */

export default function PostGrid({
  posts,
  conDestacado = false,
}: {
  posts: Array<Post>;
  conDestacado?: boolean;
}) {
  if (posts.length === 0) {
    return (
      <p className="font-body font-light text-[15px] leading-[1.9] text-ink/60 py-16 text-center">
        Todavía no hay artículos publicados en esta sección.
      </p>
    );
  }

  const destacado = conDestacado ? posts.find((p) => p.destacado) : undefined;
  const resto = destacado ? posts.filter((p) => p.id !== destacado.id) : posts;

  return (
    <>
      {destacado && (
        <div className="pb-12 md:pb-16 mb-12 md:mb-16 border-b border-edge">
          <PostCard post={destacado} destacada />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
        {resto.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
