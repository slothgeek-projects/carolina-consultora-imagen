/* Constantes y datos estructurados de SEO.
   Todo lo que necesita una URL absoluta (canonical, sitemap, Open Graph,
   JSON-LD) sale de SITE_URL: cambiar el dominio se hace en un solo lugar. */

import { faqItems } from "@/data/faq";
import { CURRENCY, paquetes } from "@/data/packages";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://carolinaimagen.com"
).replace(/\/$/, "");

export const SITE_NAME = "Piel Pantera Collections";
export const PERSON_NAME = "Carolina Salazar";
export const INSTAGRAM_URL = "https://www.instagram.com/pielpanteracollections";
/* TODO cliente: confirmar el número antes de publicar (ver también WHATSAPP_URL en app/page.tsx) */
export const PHONE_E164 = "+50670170734";

export const SITE_DESCRIPTION =
  "Consultora de imagen personal y profesional online con Carolina Salazar — análisis de colorimetría, morfología y estilo para ejecutivos y emprendedores en Costa Rica y Latinoamérica.";

/* Palabras y frases clave.
   Ojo: Google ignora <meta name="keywords"> desde 2009; se incluye porque Bing,
   Yandex y varios rastreadores de IA todavía lo leen como señal débil. El peso
   real lo cargan el <title>, los H1/H2, el copy visible y el JSON-LD de abajo. */

/** Servicios: lo que se vende. */
export const KEYWORDS_SERVICIO = [
  "asesoría de imagen",
  "asesoría de imagen personal",
  "asesoría de imagen profesional",
  "consultoría de imagen",
  "consultora de imagen",
  "asesora de imagen",
  "consultoría de imagen empresarial",
  "análisis de colorimetría",
  "colorimetría personal",
  "test de colorimetría",
  "análisis de morfología corporal",
  "análisis facial y visagismo",
  "personal shopper online",
  "estilo personal",
  "imagen ejecutiva",
  "marca personal",
  "branding personal",
  "guía de estilo personalizada",
  "armario cápsula",
];

/** Frases descriptivas de intención (long tail). */
export const KEYWORDS_FRASES = [
  "asesoría de imagen online",
  "consultora de imagen online",
  "asesoría de imagen para ejecutivos",
  "asesoría de imagen para emprendedores",
  "asesoría de imagen para profesionales",
  "asesoría de imagen para hombres y mujeres",
  "cómo saber mi colorimetría personal",
  "qué colores me favorecen según mi tono de piel",
  "cómo vestir según mi tipo de cuerpo",
  "cómo proyectar autoridad con mi imagen",
  "mejorar mi imagen profesional",
  "asesoría de imagen para marca personal",
  "precio de una asesoría de imagen",
  "asesoría de imagen por videollamada",
];

/** Locación: dónde se presta y a quién alcanza. */
export const KEYWORDS_LOCACION = [
  "asesoría de imagen Costa Rica",
  "asesora de imagen en Costa Rica",
  "consultora de imagen Costa Rica",
  "asesoría de imagen San José Costa Rica",
  "asesoría de imagen Latinoamérica",
  "asesoría de imagen online Latinoamérica",
  "consultora de imagen Centroamérica",
  "asesoría de imagen en español",
  "asesoría de imagen Panamá",
  "asesoría de imagen México",
  "asesoría de imagen Colombia",
  "asesoría de imagen Guatemala",
];

export const KEYWORDS = [
  ...KEYWORDS_SERVICIO,
  ...KEYWORDS_FRASES,
  ...KEYWORDS_LOCACION,
];

/* Países donde se presta el servicio. Se usan en areaServed del JSON-LD:
   al ser 100% online no hay dirección física que declarar, así que la señal
   geográfica viene de aquí y del copy visible. */
export const AREA_SERVIDA = [
  "Costa Rica",
  "Panamá",
  "Nicaragua",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "México",
  "Colombia",
  "Ecuador",
  "Perú",
  "Chile",
  "Argentina",
  "España",
  "Estados Unidos",
];

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#carolina-salazar`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Grafo JSON-LD de la home: negocio + persona + sitio + página + FAQ.
 * Un solo <script> con @graph en vez de cuatro bloques sueltos: así los
 * @id se referencian entre sí y Google resuelve una única entidad.
 *
 * No incluye Review ni AggregateRating a propósito — los testimonios de la
 * página todavía usan nombres de placeholder, y marcar reseñas no verificables
 * es una violación de las políticas de spam de Google.
 */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": ORG_ID,
        name: `${PERSON_NAME} · ${SITE_NAME}`,
        alternateName: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: PHONE_E164,
        priceRange: "₡₡",
        currenciesAccepted: CURRENCY,
        knowsLanguage: ["es"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "CR",
          addressLocality: "San José",
        },
        areaServed: AREA_SERVIDA.map((name) => ({ "@type": "Country", name })),
        founder: { "@id": PERSON_ID },
        employee: { "@id": PERSON_ID },
        sameAs: [INSTAGRAM_URL],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Paquetes de asesoría de imagen online",
          itemListElement: paquetes.map((p) => ({
            "@type": "Offer",
            "@id": `${SITE_URL}/#${p.slug}`,
            name: p.name,
            description: p.summary,
            price: p.price,
            priceCurrency: CURRENCY,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/#paquetes`,
            itemOffered: {
              "@type": "Service",
              name: p.name,
              description: p.summary,
              serviceType: "Asesoría de imagen personal y profesional",
              provider: { "@id": ORG_ID },
              areaServed: AREA_SERVIDA.map((name) => ({
                "@type": "Country",
                name,
              })),
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: `${SITE_URL}/agendar`,
                availableLanguage: { "@type": "Language", name: "Spanish" },
              },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON_NAME,
        jobTitle: "Consultora de Imagen Personal, Profesional y Empresarial",
        description:
          "Asesora de imagen internacional certificada. Acompaña a ejecutivos, profesionales y emprendedores de Costa Rica y Latinoamérica a alinear su presencia visual con sus objetivos de carrera.",
        image: `${SITE_URL}/hero/quiensoy.png`,
        url: SITE_URL,
        worksFor: { "@id": ORG_ID },
        nationality: { "@type": "Country", name: "Costa Rica" },
        knowsAbout: [
          "Asesoría de imagen personal",
          "Asesoría de imagen profesional",
          "Consultoría de imagen empresarial",
          "Análisis de colorimetría",
          "Análisis de morfología corporal",
          "Análisis facial y visagismo",
          "Personal shopper",
          "Marca personal",
        ],
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: `${PERSON_NAME} · ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        inLanguage: "es",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Asesoría de Imagen Personal y Profesional Online en Costa Rica",
        description: SITE_DESCRIPTION,
        inLanguage: "es",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        inLanguage: "es",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
