import Link from "next/link";
import type { Post } from "@/lib/definitions";
import { WHATSAPP_URL } from "@/lib/seo";

/* Si el artículo trae CTA propio en ACF se usa ese; si no, el de siempre:
   agendar. Un artículo sin cierre comercial es tráfico que no convierte. */

const botonPrimario =
  "inline-flex justify-center items-center px-8 py-4 bg-ink text-white font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200";
const botonSecundario =
  "inline-flex justify-center items-center px-8 py-4 border border-ink text-ink font-body text-[11px] md:text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-colors duration-200";

export default function CtaFinal({ post }: { post: Post }) {
  return (
    <aside className="max-w-3xl border-t border-edge mt-14 md:mt-16 pt-10">
      <p className="font-heading text-[22px] md:text-[26px] text-ink mb-3">
        ¿Querés aplicar esto a tu propia imagen?
      </p>
      <p className="font-body font-light text-[15px] md:text-base leading-[1.9] text-ink/75 mb-7">
        Una asesoría personalizada traduce todo lo anterior a tu colorimetría, tu
        morfología y tus objetivos profesionales.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {post.cta ? (
          <a href={post.cta.enlace} className={botonPrimario}>
            {post.cta.texto}
          </a>
        ) : (
          <Link href="/agendar" className={botonPrimario}>
            Agendar mi asesoría
          </Link>
        )}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={botonSecundario}
        >
          Escribir por WhatsApp
        </a>
      </div>
    </aside>
  );
}
