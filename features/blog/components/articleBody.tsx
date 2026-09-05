import sanitizeHtml from "sanitize-html";
import { SITE_URL } from "@/lib/seo";

/* Único lugar del proyecto con dangerouslySetInnerHTML. El HTML viene del
   editor de un WordPress que no controlamos: se pasa por una allowlist antes
   de tocar el DOM. Todo lo que no esté aquí se descarta. */

const OPCIONES: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4",
    "p", "br", "hr",
    "ul", "ol", "li",
    "strong", "b", "em", "i", "u", "s",
    "blockquote", "cite",
    "figure", "figcaption",
    "img", "a",
    "table", "thead", "tbody", "tr", "th", "td",
    "iframe",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "srcset", "sizes"],
    iframe: ["src", "title", "width", "height", "allowfullscreen", "loading"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  /* Solo vídeo incrustado de estas plataformas; cualquier otro iframe se cae. */
  allowedIframeHostnames: [
    "www.youtube.com",
    "youtube.com",
    "www.youtube-nocookie.com",
    "player.vimeo.com",
  ],
  transformTags: {
    a: (nombre, attribs) => {
      const href = attribs.href ?? "";
      const esExterno = /^https?:\/\//i.test(href) && !href.startsWith(SITE_URL);

      return {
        tagName: nombre,
        attribs: esExterno
          ? { ...attribs, target: "_blank", rel: "nofollow noopener noreferrer" }
          : attribs,
      };
    },
    /* Las imágenes del editor no pasan por next/image, así que al menos que
       no bloqueen el render inicial. */
    img: (nombre, attribs) => ({
      tagName: nombre,
      attribs: { ...attribs, loading: "lazy" },
    }),
  },
};

export default function ArticleBody({ html }: { html: string }) {
  const limpio = sanitizeHtml(html, OPCIONES);

  return (
    <div
      className="prose-pantera max-w-3xl"
      dangerouslySetInnerHTML={{ __html: limpio }}
    />
  );
}
