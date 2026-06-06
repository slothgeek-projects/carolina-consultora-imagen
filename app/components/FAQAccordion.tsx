"use client";

import { useState } from "react";

const items = [
  { q: "¿La asesoría es 100% online?", a: "Sí. Todo el proceso se realiza mediante herramientas digitales: videollamadas, análisis por fotografías, guías visuales y seguimiento personalizado. Esto permite un acompañamiento cercano y efectivo sin importar dónde estés." },
  { q: "¿Necesito experiencia previa en moda o estilo?", a: "No es necesario. La asesoría parte desde donde estás: tu estilo de vida actual, tus objetivos y lo que ya tienes en tu guardarropa. Trabajamos juntas para construir desde ahí, sin imponer tendencias ni estilos ajenos a ti." },
  { q: "¿Cuáles son los resultados concretos que puedo esperar?", a: "Nuestros clientes reportan mayor seguridad al vestir, coherencia entre su imagen y sus objetivos profesionales, y claridad absoluta al comprar. Recibirás una guía visual personalizada que puedes usar en cualquier momento. Los cambios en confianza son inmediatos; los resultados en tu entorno se perciben en 2 a 3 semanas de aplicación." },
  { q: "¿Cuánto dura el proceso?", a: "Depende del paquete elegido. El Esencial dura entre 2 y 3 semanas. El Profesional, entre 3 y 5 semanas. El Premium incluye seguimiento extendido de hasta 6 semanas. Todo se adapta a tu ritmo y disponibilidad." },
  { q: "¿Cómo sé cuál paquete es el correcto para mí?", a: "Si estás comenzando o quieres explorar el servicio, el Esencial es tu punto de partida perfecto. Si tienes metas profesionales claras y buscas coherencia total de imagen, el Profesional es el más elegido. Si representas una marca personal, lideras un equipo o necesitas acompañamiento estratégico completo, el Premium maximiza tu inversión. Escríbeme si tienes dudas — te oriento sin ningún compromiso." },
  { q: "¿El servicio incluye acompañamiento de compras?", a: "El Personal Shopper es un servicio adicional disponible en el Paquete Premium. También puede contratarse como complemento del Profesional. En él te acompañamos a seleccionar prendas específicas que funcionan para tu cuerpo, tu colorimetría y tus objetivos, de forma online o híbrida." },
  { q: "¿Puedo tomar solo una parte de la asesoría?", a: "Algunos servicios pueden tomarse de forma individual, como el análisis de colorimetría o la guía de estilo. Si buscas algo puntual, escríbeme directamente y buscamos juntas la opción que mejor se adapta a tu necesidad." },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-edge">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span className="font-body font-medium text-base text-ink pr-8 group-hover:text-mid transition-colors">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 border border-edge flex items-center justify-center text-ink transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[500px] pb-6" : "max-h-0"}`}>
            <p className="font-body font-light text-base leading-[1.8] text-mid">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
