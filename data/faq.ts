/* Fuente única de las preguntas frecuentes.
   La consume el acordeón visible (app/components/FAQAccordion.tsx) y el
   JSON-LD de FAQPage (lib/seo.ts). Google exige que la respuesta del schema
   sea idéntica a la visible en la página, así que no las dupliques. */
export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "¿La asesoría de imagen es 100% online?",
    a: "Sí. Todo el proceso se realiza mediante herramientas digitales: videollamadas, análisis por fotografías, guías visuales y seguimiento personalizado. Esto permite un acompañamiento cercano y efectivo sin importar dónde estés, en Costa Rica o en cualquier país de Latinoamérica.",
  },
  {
    q: "¿Necesito experiencia previa en moda o estilo?",
    a: "No es necesario. La asesoría parte desde donde estás: tu estilo de vida actual, tus objetivos y lo que ya tienes en tu guardarropa. Construimos esto juntos/as, sin imponer tendencias ni estilos ajenos a ti.",
  },
  {
    q: "¿Cuáles son los resultados concretos que puedo esperar?",
    a: "Nuestros clientes reportan mayor seguridad al vestir, coherencia entre su imagen y sus objetivos profesionales, y claridad absoluta al comprar. Recibirás una guía visual personalizada que puedes usar en cualquier momento. Los cambios en confianza son inmediatos; los resultados en tu entorno se perciben en 2 a 3 semanas de aplicación.",
  },
  {
    q: "¿Cuánto dura el proceso de asesoría de imagen?",
    a: "Depende del paquete elegido. El Personal dura entre 2 y 3 semanas. El Profesional, entre 3 y 5 semanas. El Empresarial incluye seguimiento extendido de hasta 6 semanas. Todo se adapta a tu ritmo y disponibilidad.",
  },
  {
    q: "¿Cómo sé cuál paquete es el correcto para mí?",
    a: "Si estás comenzando o quieres explorar el servicio, el Personal es tu punto de partida perfecto. Si tienes metas profesionales claras y buscas coherencia total de imagen, el Profesional es el más elegido. Si representas una marca personal, lideras un equipo o necesitas acompañamiento estratégico completo, el Empresarial maximiza tu inversión. Escríbeme si tienes dudas — te oriento sin ningún compromiso.",
  },
  {
    q: "¿El servicio incluye personal shopper o acompañamiento de compras?",
    a: "El Personal Shopper es un servicio adicional disponible en el Paquete Empresarial. También puede contratarse como complemento del Profesional. En él te acompañamos a seleccionar prendas específicas que funcionan para tu cuerpo, tu colorimetría y tus objetivos, de forma online o híbrida.",
  },
  {
    q: "¿Puedo tomar solo el análisis de colorimetría?",
    a: "Algunos servicios pueden tomarse de forma individual, como el análisis de colorimetría o la guía de estilo. Si buscas algo puntual, escríbeme directamente y buscamos juntas la opción que mejor se adapta a tu necesidad.",
  },
  {
    q: "¿Atiendes clientes fuera de Costa Rica?",
    a: "Sí, al ser una consultoría de imagen 100% online, trabajo con profesionales, ejecutivos y emprendedores de habla hispana en cualquier país de Latinoamérica y Centroamérica, además de Costa Rica. No importa dónde estés: accedés al mismo proceso personalizado, y las sesiones se coordinan según tu zona horaria.",
  },
];
