/* Fuente única de los servicios de la sección "Servicios de asesoría de imagen
   online". Datos puros, sin JSX: el mapeo de `icon` a un componente de
   lucide-react vive en app/components/ServiciosGrid.tsx, que es el único que
   los consume (tarjeta + modal "Leer más").
   Los precios que aparecen aquí deben coincidir con data/packages.ts, que es
   lo que alimenta el OfferCatalog del JSON-LD. */
export type ServicioIcon =
  | "palette"
  | "layers"
  | "sparkles"
  | "briefcase"
  | "building";

export type Servicio = {
  slug: string;
  title: string;
  /* Segunda línea del título, solo cuando el nombre completo del servicio no
     cabe cómodamente en la tarjeta (p. ej. la colorimetría integral). */
  subtitle?: string;
  desc: string;
  priceLabel?: string;
  icon: ServicioIcon;
  bullets: string[];
};

export const servicios: Servicio[] = [
  {
    slug: "analisis-colorimetria",
    title: "Análisis de Colorimetría",
    desc: "Identificamos tu subtono, temperatura y contraste natural para definir la paleta exacta que ilumina tu rostro y potencia tu presencia.",
    icon: "palette",
    bullets: [
      "Entrevista inicial por videollamada — al confirmar tu reserva recibes un enlace con una breve encuesta para conocerte antes de la sesión",
      "Evaluación con herramientas digitales de diagnóstico de color, a partir de la fotografía en luz natural que tú nos compartes",
      "Paleta personalizada de colores entregada en guía digital",
      "Aplicable a ropa, maquillaje y accesorios",
      "Entrega de guía: 3–5 días hábiles tras la sesión",
      "Revista Personalizada impresa disponible como adicional al finalizar el proceso ($20 USD)",
    ],
  },
  {
    slug: "colorimetria-integral",
    title: "Colorimetría Integral",
    subtitle: "Personal + Profesional + Marca/Negocio",
    desc: "La misma base técnica de tu colorimetría, llevada a los tres espacios donde tu imagen habla por ti: tu día a día, tu trayectoria profesional y tu marca o negocio.",
    icon: "layers",
    bullets: [
      "Entrevista inicial por videollamada — al confirmar tu reserva recibes un enlace con una breve encuesta para conocer tus objetivos en cada una de las tres áreas",
      "Evaluación con herramientas digitales de diagnóstico de color, a partir de la fotografía en luz natural que tú nos compartes",
      "Guía de aplicación personal: tu paleta traducida a guardarropa y vida diaria",
      "Guía de aplicación profesional: tu paleta traducida a imagen ejecutiva y comunicación visual en tu carrera",
      "Guía de aplicación de marca/negocio: tu paleta traducida a identidad de marca, redes sociales y materiales de marketing",
      "Documento único con las tres guías integradas, entregado en formato digital",
      "Entrega: 5–7 días hábiles (incluye el trabajo adicional de adaptar la paleta a los tres contextos)",
      "Revista Personalizada impresa disponible como adicional al finalizar el proceso ($20 USD)",
    ],
  },
  {
    slug: "imagen-personal",
    title: "Consultoría de Imagen Personal",
    desc: "Un estilo propio, coherente y sostenible. Definimos qué te funciona según tu cuerpo, tu vida real y quién quieres ser hoy.",
    priceLabel: "$210 USD",
    icon: "sparkles",
    bullets: [
      "Entrevista inicial por videollamada — al confirmar tu reserva recibes un enlace con una breve encuesta para conocerte antes de la sesión",
      "Diagnóstico de morfología corporal y estilo de vida",
      "Definición de tu paleta de colores (colorimetría incluida)",
      "Guía de siluetas, prendas y combinaciones que te favorecen",
      "Plan de aplicación para tu guardarropa actual",
      "Formato: 100% online, con guía visual descargable al finalizar",
      "Revista Personalizada impresa disponible como adicional al finalizar el proceso ($20 USD)",
    ],
  },
  {
    slug: "imagen-profesional",
    title: "Consultoría de Imagen Profesional",
    desc: "Alineamos tu presencia visual con tu rol, tu sector y tus objetivos de carrera para que comuniques autoridad antes de hablar.",
    priceLabel: "$365 USD",
    icon: "briefcase",
    bullets: [
      "Entrevista inicial por videollamada — al confirmar tu reserva recibes un enlace con una breve encuesta para conocerte antes de la sesión",
      "Análisis facial y de morfología corporal",
      "Definición de estilo ejecutivo/profesional según tu sector",
      "Guía visual con combinaciones listas para reuniones, entrevistas o eventos clave",
      "Recomendaciones de accesorios y grooming que refuerzan tu credibilidad",
      "Formato: 100% online · seguimiento por WhatsApp durante el proceso",
      "Revista Personalizada impresa disponible como adicional al finalizar el proceso ($20 USD)",
    ],
  },
  {
    slug: "imagen-empresarial",
    title: "Consultoría de Imagen Empresarial",
    desc: "Estrategia de imagen para líderes y marcas personales que representan a su organización frente a clientes, inversores y mercado.",
    priceLabel: "$645 USD",
    icon: "building",
    bullets: [
      "Entrevista inicial por videollamada — al confirmar tu reserva recibes un enlace con una breve encuesta para conocerte antes de la sesión",
      "Auditoría de tu imagen actual frente a tu rol de liderazgo",
      "Estrategia de imagen alineada a la identidad y valores de tu marca u organización",
      "Personal Shopper incluido para llevar la estrategia a tu guardarropa real",
      "Seguimiento extendido para sostener el cambio en el tiempo",
      "Formato: Online / Híbrido — la modalidad híbrida incluye acompañamiento de compras presencial en tu ciudad, sujeto a disponibilidad geográfica (consultar)",
      "Revista Personalizada impresa incluida sin costo adicional (único paquete que la incluye dentro del servicio)",
    ],
  },
];
