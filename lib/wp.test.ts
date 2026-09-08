import test from "node:test";
import assert from "node:assert/strict";

import { toPost, toCategoria } from "./wp";
import type { WpRawPost, WpRawTerm } from "./definitions";

/* Los mappers son la frontera con WordPress: aquí se concentran los fallos
   de esta integración (campos ACF ausentes, _embedded vacío, entidades HTML
   sin decodificar). Fixtures con la forma real de la REST, no inventada. */

function crearRaw(overrides: Partial<WpRawPost> = {}): WpRawPost {
  return {
    id: 42,
    slug: "colorimetria-basica",
    date_gmt: "2026-08-30T16:00:00",
    modified_gmt: "2026-09-01T12:30:00",
    title: { rendered: "Colorimetr&#237;a b&#225;sica" },
    content: { rendered: "<p>Hola</p>" },
    acf: {},
    ...overrides,
  } as WpRawPost;
}

test("toPost mapea id, slug y contenido del post", () => {
  const post = toPost(crearRaw());

  assert.equal(post.id, 42);
  assert.equal(post.slug, "colorimetria-basica");
  assert.equal(post.contenidoHtml, "<p>Hola</p>");
});

test("toPost decodifica las entidades HTML del título", () => {
  const post = toPost(
    crearRaw({ title: { rendered: "Moda &amp; estilo: lo que s&#237; funciona" } })
  );

  assert.equal(post.titulo, "Moda & estilo: lo que sí funciona");
});

test("toPost interpreta date_gmt como UTC", () => {
  const post = toPost(crearRaw({ date_gmt: "2026-08-30T16:00:00" }));

  assert.equal(post.fecha, "2026-08-30T16:00:00.000Z");
});

test("toPost toma la imagen destacada de _embedded", () => {
  const post = toPost(
    crearRaw({
      _embedded: {
        "wp:featuredmedia": [
          {
            id: 51,
            source_url: "https://cms.example.com/foto.jpg",
            alt_text: "Paleta de colores fríos",
            media_details: { width: 1200, height: 800 },
          },
        ],
      },
    })
  );

  assert.deepEqual(post.imagen, {
    url: "https://cms.example.com/foto.jpg",
    alt: "Paleta de colores fríos",
    width: 1200,
    height: 800,
  });
});

test("toPost deja la imagen en null cuando el post no trae _embedded", () => {
  const post = toPost(crearRaw());

  assert.equal(post.imagen, null);
});

test("toPost ignora la media embebida que llega como error de la REST", () => {
  /* Cuando el adjunto se borró, _embedded trae un objeto de error en vez
     del medio, y leer source_url a ciegas rompe la página. */
  const post = toPost(
    crearRaw({
      _embedded: {
        "wp:featuredmedia": [{ code: "rest_post_invalid_id" }],
      },
    } as Partial<WpRawPost>)
  );

  assert.equal(post.imagen, null);
});

test("toPost toma la categoría del término de categoria_articulo", () => {
  const post = toPost(
    crearRaw({
      _embedded: {
        "wp:term": [
          [{ id: 3, name: "Sin clasificar", slug: "sin", taxonomy: "category" }],
          [
            {
              id: 7,
              name: "Colorimetr&#237;a",
              slug: "colorimetria",
              taxonomy: "categoria_articulo",
            },
          ],
        ],
      },
    })
  );

  assert.deepEqual(post.categoria, {
    id: 7,
    nombre: "Colorimetría",
    slug: "colorimetria",
  });
});

test("toPost mapea los campos ACF", () => {
  const post = toPost(
    crearRaw({
      acf: {
        extracto: "Cómo saber qué colores te favorecen.",
        tiempo_lectura: 6,
        destacado: true,
        seo_title: "Colorimetría personal: guía",
        seo_description: "Guía breve de colorimetría.",
        og_image: {
          url: "https://cms.example.com/og.jpg",
          alt: "Colorimetría",
          width: 1200,
          height: 630,
        },
        cta_texto: "Agenda tu análisis",
        cta_enlace: "https://carolinaimagen.com/agendar",
      },
    })
  );

  assert.equal(post.extracto, "Cómo saber qué colores te favorecen.");
  assert.equal(post.tiempoLectura, 6);
  assert.equal(post.destacado, true);
  assert.equal(post.seoTitulo, "Colorimetría personal: guía");
  assert.equal(post.seoDescripcion, "Guía breve de colorimetría.");
  assert.equal(post.ogImagen?.url, "https://cms.example.com/og.jpg");
  assert.deepEqual(post.cta, {
    texto: "Agenda tu análisis",
    enlace: "https://carolinaimagen.com/agendar",
  });
});

test("toPost usa valores por defecto cuando acf viene vacío", () => {
  const post = toPost(crearRaw({ acf: {} }));

  assert.equal(post.extracto, "");
  assert.equal(post.tiempoLectura, null);
  assert.equal(post.destacado, false);
  assert.equal(post.seoTitulo, null);
  assert.equal(post.seoDescripcion, null);
  assert.equal(post.ogImagen, null);
  assert.equal(post.cta, null);
});

test("toPost ignora el CTA si falta el enlace", () => {
  const post = toPost(crearRaw({ acf: { cta_texto: "Agenda", cta_enlace: "" } }));

  assert.equal(post.cta, null);
});

test("toPost ignora og_image cuando llega como ID numérico", () => {
  /* Pasa si alguien quita acf_format=standard de la petición: ACF devuelve
     el ID del adjunto y no una URL usable. */
  const post = toPost(crearRaw({ acf: { og_image: 51 } }));

  assert.equal(post.ogImagen, null);
});

test("toCategoria mapea id, nombre decodificado y slug", () => {
  const raw: WpRawTerm = {
    id: 7,
    name: "Imagen &amp; marca personal",
    slug: "imagen-marca-personal",
    taxonomy: "categoria_articulo",
  };

  assert.deepEqual(toCategoria(raw), {
    id: 7,
    nombre: "Imagen & marca personal",
    slug: "imagen-marca-personal",
  });
});

/* ── Capa de red ─────────────────────────────────────────────────────────
   Un 403 desde WordPress y un 403 desde el WAF/CDN que tiene delante son
   indistinguibles si el error solo lleva el status, y en producción es lo
   único que queda en el log. El mensaje tiene que identificar al autor. */

async function conFetchStub(
  respuesta: Response,
  ejecutar: () => Promise<unknown>
): Promise<Error> {
  const original = globalThis.fetch;
  globalThis.fetch = async () => respuesta;
  try {
    await ejecutar();
    throw new Error("se esperaba un WpError");
  } catch (error) {
    return error as Error;
  } finally {
    globalThis.fetch = original;
  }
}

test("el error de una respuesta no-ok incluye el cuerpo y las cabeceras del CDN", async () => {
  process.env.WP_API_URL = "https://cms.ejemplo.com";
  const { getPosts } = await import("./wp");

  const error = await conFetchStub(
    new Response("<html><title>Attention Required! | Cloudflare</title></html>", {
      status: 403,
      headers: { server: "cloudflare", "cf-ray": "abc123-MIA", "cf-mitigated": "challenge" },
    }),
    () => getPosts()
  );

  assert.match(error.message, /403 en articulos/);
  assert.match(error.message, /cloudflare/);
  assert.match(error.message, /cf-ray: abc123-MIA/);
  assert.match(error.message, /cf-mitigated: challenge/);
  assert.match(error.message, /Attention Required/);
});

test("el error de un 403 de la propia REST conserva el código de WordPress", async () => {
  process.env.WP_API_URL = "https://cms.ejemplo.com";
  const { getPosts } = await import("./wp");

  const error = await conFetchStub(
    Response.json({ code: "rest_forbidden", message: "Lo siento, no tienes permisos." }, { status: 403 }),
    () => getPosts()
  );

  assert.match(error.message, /rest_forbidden/);
});
