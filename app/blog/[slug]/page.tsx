import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleBody from "@/features/blog/components/articleBody";
import ArticleHeader from "@/features/blog/components/articleHeader";
import { BlogFooter, BlogHeader } from "@/features/blog/components/blogShell";
import CtaFinal from "@/features/blog/components/ctaFinal";
import Relacionados from "@/features/blog/components/relacionados";
import { getPost, getRelacionados } from "@/lib/wp";
import { buildPostJsonLd, SITE_DESCRIPTION } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Artículo no encontrado", robots: { index: false } };

  /* Cascada de respaldos: lo que el editor no rellene en ACF sale del propio
     artículo, nunca vacío. */
  const descripcion = post.seoDescripcion ?? post.extracto ?? SITE_DESCRIPTION;
  const imagen = post.ogImagen ?? post.imagen;
  const url = `/blog/${post.slug}`;

  return {
    title: post.seoTitulo ?? post.titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitulo ?? post.titulo,
      description: descripcion,
      publishedTime: post.fecha,
      modifiedTime: post.fechaModificada || post.fecha,
      images: imagen ? [{ url: imagen.url, alt: imagen.alt || post.titulo }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitulo ?? post.titulo,
      description: descripcion,
      images: imagen ? [imagen.url] : undefined,
    },
  };
}

export default async function ArticuloPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const relacionados = await getRelacionados(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPostJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />
      <BlogHeader volverA="/blog" />

      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pt-14 md:pt-20">
        <article>
          <ArticleHeader post={post} />
          <div className="mt-10 md:mt-14">
            <ArticleBody html={post.contenidoHtml} />
          </div>
          <CtaFinal post={post} />
        </article>

        <Relacionados posts={relacionados} />
      </main>

      <BlogFooter />
    </>
  );
}
