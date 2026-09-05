import Link from "next/link";
import { BlogFooter, BlogHeader } from "@/features/blog/components/blogShell";

export default function NotFound() {
  return (
    <>
      <BlogHeader volverA="/blog" />

      <main className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32">
        <div className="max-w-xl">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-mid mb-5">
            Error 404
          </p>
          <h1 className="font-heading text-[30px] md:text-[38px] leading-[1.2] text-ink mb-5">
            Este artículo no existe
          </h1>
          <p className="font-body font-light text-[15px] md:text-base leading-[1.9] text-ink/70 mb-8">
            Puede que lo hayamos movido o que el enlace esté mal escrito. En el
            blog están todos los artículos publicados.
          </p>

          <Link
            href="/blog"
            className="inline-flex justify-center items-center px-8 py-4 bg-ink text-white font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200"
          >
            Ver todos los artículos
          </Link>
        </div>
      </main>

      <BlogFooter />
    </>
  );
}
