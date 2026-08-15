/* Fuente única de nombre, precio y descripción de los paquetes.
   La consumen las tarjetas visibles (app/page.tsx) y el OfferCatalog del
   JSON-LD (lib/seo.ts). Google marca "Offer price mismatch" si el precio del
   schema no coincide con el que ve el usuario, así que ambos leen de aquí.
   Los bullets de cada tarjeta siguen inline en page.tsx: no van al schema. */
export type Paquete = {
  slug: string;
  badge: string;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  summary: string;
  modalidad: string;
};

export const CURRENCY = "CRC";

export const paquetes: Paquete[] = [
  {
    slug: "imagen-esencial",
    badge: "Esencial",
    name: "Imagen Esencial",
    price: 85000,
    priceLabel: "₡85.000",
    tagline: "Tu punto de partida.",
    summary:
      "Asesoría de imagen personal online para quienes quieren comenzar su proceso de transformación con bases sólidas: morfología corporal y colorimetría personal.",
    modalidad: "Online",
  },
  {
    slug: "imagen-profesional",
    badge: "Profesional",
    name: "Imagen Profesional",
    price: 165000,
    priceLabel: "₡165.000",
    tagline: "La inversión que tu presencia merece.",
    summary:
      "Consultoría de imagen profesional online para profesionales y emprendedores que desean proyectar seguridad, coherencia y credibilidad. Incluye análisis facial y definición de estilo.",
    modalidad: "Online",
  },
  {
    slug: "imagen-empresarial",
    badge: "Premium",
    name: "Imagen Empresarial",
    price: 290000,
    priceLabel: "₡290.000",
    tagline: "Proceso completo, resultados que se ven.",
    summary:
      "Consultoría de imagen empresarial para líderes, ejecutivos y marcas personales que requieren una imagen alineada a su rol y objetivos. Incluye personal shopper y seguimiento extendido.",
    modalidad: "Online / Híbrido",
  },
];

export const [paqueteEsencial, paqueteProfesional, paqueteEmpresarial] = paquetes;
