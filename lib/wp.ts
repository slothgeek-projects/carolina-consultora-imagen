import type {
  Categoria,
  Imagen,
  ListadoPosts,
  Post,
  WpRawAcfImage,
  WpRawMedia,
  WpRawPost,
  WpRawTerm,
} from "@/lib/definitions";

/** Clave de la taxonomía registrada en ACF (ACF › Taxonomies). */
export const TAXONOMIA = "categoria_articulo";

const ENTIDADES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  laquo: "«",
  raquo: "»",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
};

/* WordPress devuelve title.rendered y term.name con entidades HTML
   ("Colorimetr&#237;a"). Como esos textos van a <title>, a og:title y a texto
   plano dentro de JSX, hay que decodificarlos: React escapa la salida, así
   que insertar la entidad cruda la mostraría literal. */
export function decodeEntities(texto: string): string {
  return texto.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entidad, cuerpo: string) => {
    if (cuerpo[0] === "#") {
      const codigo =
        cuerpo[1] === "x" || cuerpo[1] === "X"
          ? parseInt(cuerpo.slice(2), 16)
          : parseInt(cuerpo.slice(1), 10);
      return Number.isNaN(codigo) ? entidad : String.fromCodePoint(codigo);
    }
    return ENTIDADES[cuerpo.toLowerCase()] ?? entidad;
  });
}

/* Las fechas *_gmt llegan en UTC pero sin sufijo de zona, así que new Date()
   las interpretaría como hora local del servidor. La "Z" lo evita. */
function fechaISO(gmt: string): string {
  const fecha = new Date(`${gmt}Z`);
  return Number.isNaN(fecha.getTime()) ? "" : fecha.toISOString();
}

function toImagenMedia(media: WpRawMedia | undefined): Imagen | null {
  /* Si el adjunto se borró, _embedded trae un objeto de error en su lugar. */
  if (!media?.source_url) return null;

  return {
    url: media.source_url,
    alt: decodeEntities(media.alt_text ?? ""),
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

function toImagenAcf(campo: WpRawAcfImage | number | false | null | undefined) {
  /* Sin acf_format=standard, ACF devuelve el id del adjunto: inservible aquí. */
  if (!campo || typeof campo !== "object" || !campo.url) return null;

  return {
    url: campo.url,
    alt: decodeEntities(campo.alt ?? ""),
    width: campo.width,
    height: campo.height,
  };
}

export function toCategoria(raw: WpRawTerm): Categoria {
  return {
    id: raw.id,
    nombre: decodeEntities(raw.name),
    slug: raw.slug,
  };
}

function categoriaEmbebida(raw: WpRawPost): Categoria | null {
  /* wp:term es un array por taxonomía; nos interesa solo la nuestra. */
  const grupos = raw._embedded?.["wp:term"] ?? [];
  const termino = grupos
    .flat()
    .find((t) => t?.taxonomy === TAXONOMIA);

  return termino ? toCategoria(termino) : null;
}

export function toPost(raw: WpRawPost): Post {
  const acf = raw.acf ?? {};
  const tiempo = Number(acf.tiempo_lectura);

  return {
    id: raw.id,
    slug: raw.slug,
    titulo: decodeEntities(raw.title?.rendered ?? ""),
    contenidoHtml: raw.content?.rendered ?? "",
    extracto: decodeEntities(acf.extracto ?? ""),
    fecha: fechaISO(raw.date_gmt),
    fechaModificada: fechaISO(raw.modified_gmt),
    tiempoLectura: Number.isFinite(tiempo) && tiempo > 0 ? tiempo : null,
    destacado: acf.destacado === true,
    imagen: toImagenMedia(raw._embedded?.["wp:featuredmedia"]?.[0]),
    categoria: categoriaEmbebida(raw),
    seoTitulo: acf.seo_title || null,
    seoDescripcion: acf.seo_description || null,
    ogImagen: toImagenAcf(acf.og_image),
    cta:
      acf.cta_texto && acf.cta_enlace
        ? { texto: acf.cta_texto, enlace: acf.cta_enlace }
        : null,
  };
}

/* ── Capa de red ─────────────────────────────────────────────────────────
   Único punto del proyecto que habla con WordPress. La política de caché vive
   aquí: hoy es SSR puro (no-store); pasar a ISR es cambiar estas opciones de
   fetch y nada más. */

export const POSTS_POR_PAGINA = 9;

/** El WP está en la ruta crítica de cada visita: no se le espera indefinidamente. */
const TIMEOUT_MS = 5000;

export class WpError extends Error {
  constructor(mensaje: string, readonly status?: number) {
    super(mensaje);
    this.name = "WpError";
  }
}

type Respuesta<T> = { datos: T; totalPages: number; total: number };

/* Un 403 de WordPress ("rest_forbidden") y un 403 del CDN/WAF que tiene
   delante son indistinguibles mirando solo el status, y en producción el log
   es lo único que queda. Estas pistas —cabeceras de origen y cuerpo recortado—
   identifican quién bloqueó sin volcar la respuesta entera al log. */
const CABECERAS_PISTA = ["server", "cf-ray", "cf-mitigated", "retry-after"];
const LARGO_PISTA = 300;

async function pistas(respuesta: Response): Promise<string> {
  const cabeceras = CABECERAS_PISTA.map(
    (nombre) => [nombre, respuesta.headers.get(nombre)] as const
  )
    .filter(([, valor]) => valor)
    .map(([nombre, valor]) => `${nombre}: ${valor}`)
    .join("; ");

  let cuerpo = "";
  try {
    cuerpo = (await respuesta.text()).replace(/\s+/g, " ").trim().slice(0, LARGO_PISTA);
  } catch {
    /* Cuerpo ilegible o consumido: las cabeceras ya dicen bastante. */
  }

  return `${cabeceras ? ` [${cabeceras}]` : ""}${cuerpo ? ` — ${cuerpo}` : ""}`;
}

async function wpFetch<T>(
  ruta: string,
  params: Record<string, string | number | undefined> = {},
  opciones: { revalidate?: number } = {}
): Promise<Respuesta<T>> {
  /* Se lee en cada llamada, no al cargar el módulo: así el valor no queda
     congelado en el bundle de build y la capa de red es testeable. */
  const base = process.env.WP_API_URL;
  if (!base) {
    throw new WpError("Falta la variable de entorno WP_API_URL");
  }

  const url = new URL(`/wp-json/wp/v2/${ruta}`, base);
  for (const [clave, valor] of Object.entries(params)) {
    if (valor !== undefined && valor !== "") url.searchParams.set(clave, String(valor));
  }

  let respuesta: Response;
  try {
    respuesta = await fetch(url, {
      /* Sin revalidate explícito, SSR puro: el blog siempre muestra lo último
         publicado. Con revalidate, la ruta que llama puede seguir siendo
         estática — lo usa la home para no volverse dinámica entera. */
      ...(opciones.revalidate === undefined
        ? { cache: "no-store" as const }
        : { next: { revalidate: opciones.revalidate } }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    throw new WpError(
      `No se pudo contactar con WordPress: ${(error as Error).message}`
    );
  }

  if (!respuesta.ok) {
    throw new WpError(
      `WordPress respondió ${respuesta.status} en ${ruta}${await pistas(respuesta)}`,
      respuesta.status
    );
  }

  return {
    datos: (await respuesta.json()) as T,
    totalPages: Number(respuesta.headers.get("X-WP-TotalPages") ?? 1),
    total: Number(respuesta.headers.get("X-WP-Total") ?? 0),
  };
}

/* acf_format=standard es obligatorio: en el formato light (el de por defecto)
   los campos de imagen de ACF llegan como id numérico y no como URL. */
const PARAMS_POST = {
  acf_format: "standard",
  _embed: "wp:featuredmedia,wp:term",
} as const;

export async function getCategorias(revalidate?: number): Promise<Array<Categoria>> {
  const { datos } = await wpFetch<Array<WpRawTerm>>(
    "categorias-articulo",
    { per_page: 100, hide_empty: "true", orderby: "name", order: "asc" },
    { revalidate }
  );

  return datos.map(toCategoria);
}

export async function getCategoria(slug: string): Promise<Categoria | null> {
  const { datos } = await wpFetch<Array<WpRawTerm>>("categorias-articulo", {
    slug,
    per_page: 1,
  });

  return datos.length > 0 ? toCategoria(datos[0]) : null;
}

export async function getPosts({
  page = 1,
  categoriaId,
  revalidate,
}: { page?: number; categoriaId?: number; revalidate?: number } = {}): Promise<ListadoPosts> {
  const { datos, totalPages, total } = await wpFetch<Array<WpRawPost>>(
    "articulos",
    {
      ...PARAMS_POST,
      per_page: POSTS_POR_PAGINA,
      page,
      [TAXONOMIA]: categoriaId,
    },
    { revalidate }
  );

  return { posts: datos.map(toPost), totalPages, total };
}

export async function getPost(slug: string): Promise<Post | null> {
  const { datos } = await wpFetch<Array<WpRawPost>>("articulos", {
    ...PARAMS_POST,
    slug,
    per_page: 1,
  });

  return datos.length > 0 ? toPost(datos[0]) : null;
}

export async function getRelacionados(post: Post): Promise<Array<Post>> {
  if (!post.categoria) return [];

  const { datos } = await wpFetch<Array<WpRawPost>>("articulos", {
    ...PARAMS_POST,
    [TAXONOMIA]: post.categoria.id,
    exclude: post.id,
    per_page: 3,
  });

  return datos.map(toPost);
}

/** Cada cuánto se refresca el bloque de blog de la home. */
const REVALIDATE_HOME = 300;

/* Para la home. Dos diferencias deliberadas con el resto del módulo:
   - Si el WP no responde devuelve [], y la landing se pinta igual sin bloque.
   - Va con revalidate, no con no-store: un fetch dinámico aquí obligaría a
     renderizar la home entera en cada visita, y esa página no depende de
     WordPress para nada más. Las rutas de /blog sí son SSR puro. */
export async function getUltimos(cantidad = 3): Promise<Array<Post>> {
  try {
    const { datos } = await wpFetch<Array<WpRawPost>>(
      "articulos",
      { ...PARAMS_POST, per_page: cantidad },
      { revalidate: REVALIDATE_HOME }
    );
    return datos.map(toPost);
  } catch {
    return [];
  }
}
