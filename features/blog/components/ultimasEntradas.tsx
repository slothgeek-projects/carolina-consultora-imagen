import Link from "next/link";
import AnimatedSection from "@/app/components/AnimatedSection";
import PostCard from "@/features/blog/components/postCard";
import { getUltimos } from "@/lib/wp";

/* Bloque de la home. getUltimos devuelve [] si el WordPress no responde, así
   que un CMS caído se queda sin sección pero no tumba la landing. Va dentro de
   <Suspense> en app/page.tsx para no bloquear el resto del render. */

export default async function UltimasEntradas() {
  const posts = await getUltimos(3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-20 md:py-28 bg-white border-t border-edge">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <AnimatedSection className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
            Blog
          </p>
          <h2 className="font-heading text-[clamp(28px,4.4vw,46px)] font-normal text-ink leading-[1.1]">
            Hay más por descubrir, seguí explorando
          </h2>
          <div className="w-7 h-px bg-ink mx-auto mt-5" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 50}>
              <PostCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/blog"
            className="inline-flex justify-center items-center px-8 py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-colors duration-200"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
