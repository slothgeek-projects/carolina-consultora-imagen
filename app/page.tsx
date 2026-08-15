import Nav from "./components/Nav";
import AnimatedSection from "./components/AnimatedSection";

import FAQAccordion from "./components/FAQAccordion";
import Carrusel from "./components/carrusel";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  Camera,
  Check,
  FileText,
  Fingerprint,
  Globe,
  Handshake,
  MessageSquare,
  Palette,
  ScanFace,
  ShoppingBag,
  Sparkles,
  Target,
  Video,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/50670170734?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20la%20asesor%C3%ADa%20de%20imagen.";
const AGENDA_URL = "/agendar";

const HERO_IMG = "/hero/bg.svg";

/* lucide-react ya no incluye íconos de marca, así que WhatsApp e Instagram
   siguen siendo SVG propios. El resto viene de lucide. */
const IconWhatsApp = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.533 5.851L.049 23.5a.5.5 0 0 0 .613.613l5.699-1.484A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.664-.528-5.176-1.443l-.37-.22-3.839 1 .998-3.745-.238-.383A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
/* Los perfiles "Empresas y Equipos" se retiraron: aún no hay
   experiencia en ese segmento. */
const profiles = [
  {
    title: "Profesionales en ascenso",
    pain: "Tu cargo ya es sólido, pero tu imagen todavía no refleja el nivel que alcanzaste.",
  },
  {
    title: "Ejecutivos y Líderes",
    pain: "Lideras equipos, pero tu imagen aún no está liderando contigo.",
  },
  {
    title: "Emprendedores y Marcas Personales",
    pain: "Eres tu propio negocio. Tu imagen debe construir tu marca antes de que hables.",
  },
  {
    title: "En Transición Personal o Profesional",
    pain: "Estás en un nuevo capítulo. Tu imagen debe acompañar quién estás siendo hoy.",
  },
];

const services = [
  {
    title: "Análisis de Colorimetría",
    desc: "Identificamos tu subtono, temperatura y contraste natural para definir la paleta exacta que ilumina tu rostro y potencia tu presencia.",
    icon: <Palette size={26} strokeWidth={1.2} />,
  },
  {
    title: "Consultoría de Imagen Personal",
    desc: "Un estilo propio, coherente y sostenible. Definimos qué te funciona según tu cuerpo, tu vida real y quién quieres ser hoy.",
    icon: <Sparkles size={26} strokeWidth={1.2} />,
  },
  {
    title: "Consultoría de Imagen Profesional",
    desc: "Alineamos tu presencia visual con tu rol, tu sector y tus objetivos de carrera para que comuniques autoridad antes de hablar.",
    icon: <Briefcase size={26} strokeWidth={1.2} />,
  },
  {
    title: "Consultoría de Imagen Empresarial",
    desc: "Estrategia de imagen para líderes y marcas personales que representan a su organización frente a clientes, inversores y mercado.",
    icon: <Building2 size={26} strokeWidth={1.2} />,
  },
  {
    title: "Análisis Corporal y Facial",
    desc: "Morfología, proporciones, postura y facciones: la base técnica que hace que cada recomendación sea precisa y no genérica.",
    icon: <ScanFace size={26} strokeWidth={1.2} />,
  },
  {
    title: "Personal Shopper",
    desc: "Aplicamos lo aprendido: seleccionamos juntas prendas concretas para tu cuerpo, tu colorimetría y tus objetivos. Online o híbrido.",
    icon: <ShoppingBag size={26} strokeWidth={1.2} />,
  },
];

const steps = [
  { number: "01", title: "Entrevista inicial", description: "Conocemos tu historia, objetivos, estilo actual y lo que deseas transformar." },
  { number: "02", title: "Definición de objetivos", description: "Establecemos metas claras según tu contexto personal, profesional o empresarial." },
  { number: "03", title: "Análisis corporal", description: "Medidas, proporciones, postura y biotipo corporal para recomendaciones precisas." },
  { number: "04", title: "Análisis facial", description: "Forma del rostro, facciones y armonía para definir cortes, estilos y accesorios." },
  { number: "05", title: "Colorimetría", description: "Identificación de tonos, subtonos y paleta ideal que potencie tu imagen." },
  { number: "06", title: "Diagnóstico y retroalimentación", description: "Revisión integral del análisis y ajustes personalizados contigo." },
  { number: "07", title: "Revista personal", description: "Prendas, colores, accesorios, maquillaje y cabello: tu manual personalizado, entregado también como revista." },
];

const benefits = [
  { title: "Seguridad y autoridad", desc: "Proyectas confianza en cualquier entorno, reunión o evento." },
  { title: "Coherencia profesional", desc: "Tu imagen refleja el nivel real de tu trayectoria y tus logros." },
  { title: "Claridad al comprar", desc: "Sabes exactamente qué funciona para ti. Cero compras por impulso." },
  { title: "Guía visual propia", desc: "Un manual personalizado que usas en cualquier momento, para siempre." },
  { title: "Imagen alineada a tus metas", desc: "Tu presencia visual trabaja junto a tus objetivos de carrera y vida." },
  { title: "Primera impresión que abre puertas", desc: "Comunicas autoridad, criterio y credibilidad antes de hablar." },
];

const testimonialSlides = [
  <div key="t1" className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-white/25 leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-white/80 pt-6 mb-8">
      Siempre sentí que mi ropa no me representaba del todo. Después de la asesoría llegué a reuniones importantes sintiéndome la{" "}
      <strong className="font-medium text-white">versión más poderosa de mí misma</strong>. El cambio fue inmediato — no solo en cómo me veía, sino en cómo me percibían los demás.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-white">Ana Laura M.</p>
        <p className="font-body font-light text-xs text-white/50 tracking-wide uppercase mt-0.5">Directora de Marketing</p>
      </div>
    </div>
  </div>,

  <div key="t2" className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-white/25 leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-white/80 pt-6 mb-8">
      <strong className="font-medium text-white">Gasto la mitad y me siento el doble de segura.</strong> Carolina me enseñó exactamente qué prendas funcionan para mi cuerpo, mi colorimetría y mis objetivos. Por primera vez en mi vida compro con criterio, no por impulso.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-white">Valeria R.</p>
        <p className="font-body font-light text-xs text-white/50 tracking-wide uppercase mt-0.5">Emprendedora</p>
      </div>
    </div>
  </div>,

  <div key="t3" className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-white/25 leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-white/80 pt-6 mb-8">
      Como ejecutivo nunca le había dado importancia real a la imagen. Hoy entiendo que era{" "}
      <strong className="font-medium text-white">mi activo más desaprovechado</strong>. Después de la asesoría, varios clientes comentaron que notaron algo diferente — más presencia, más autoridad.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-white">Ricardo F.</p>
        <p className="font-body font-light text-xs text-white/50 tracking-wide uppercase mt-0.5">Gerente General</p>
      </div>
    </div>
  </div>,
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section id="inicio" className="relative bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[3fr_2fr] items-stretch min-h-screen">
          {/* Left — texto */}
          <div className="flex flex-col justify-center px-6 lg:px-12 pt-32 pb-16 lg:py-32 order-2 lg:order-1 z-10 relative">

            <h1 className="font-heading text-[clamp(42px,5.2vw,68px)] font-normal leading-[1.04] tracking-[-0.01em] text-ink mb-7">
              Consultora de Imagen{" "}
              <em className="italic text-mid">Estratégica</em>
            </h1>
            <div className="w-8 h-px bg-ink mb-6" />
            {/* Perfil profesional condensado — versión corta de "Sobre mí" */}
            <p className="font-body font-light text-[15px] leading-[1.85] max-w-[460px] mb-8">
              Consultora de imagen certificada. Trabajo con profesionales, líderes y emprendedores 
              de habla hispana para alinear su presencia visual con quiénes son y a dónde van. 
              Mi enfoque no es moda — es estrategia de identidad.
            </p>

            {/* Pills — 3 servicios destacados */}
            <ul className="flex flex-wrap gap-2 mb-9 list-none">
              {[
                "Consultoría de Imagen Estratégica",
                "Análisis de Colorimetría",
              ].map((pill) => (
                <li
                  key={pill}
                  className="font-body text-[10px] tracking-[0.12em] uppercase border border-mid px-4 py-2"
                >
                  {pill}
                </li>
              ))}
            </ul>

            {/* CTA único */}
            <div>
              <a
                href="#servicios"
                className="inline-block px-9 py-4 bg-ink text-white font-body text-[10px] tracking-[0.14em] uppercase hover:bg-[#333] transition-colors duration-200"
              >
                Ver todos los servicios
              </a>
            </div>
          </div>

          {/* Right — foto nueva a color */}
          <div className="absolute top-0 w-full right-0 min-h-[420px] lg:min-h-screen order-1 lg:order-2">
            <Image
              src={HERO_IMG}
              alt="Carolina Salazar, consultora de imagen estratégica"
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 2. PROPÓSITO ────────────────────────────────────────── */}
      <section id="proposito" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14 space-y-4 max-w-3xl mx-auto">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle">
              Para quién es
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              Diseñada para quienes entienden que su imagen{" "}
              <em className="italic text-mid">es parte de su estrategia</em>
            </h2>
            <div className="w-7 h-px bg-ink mx-auto" />
            <p className="font-body font-light text-[15px] leading-[1.9] text-mid">
              <strong className="font-medium text-ink">Esta asesoría no es para todos</strong> — y eso es precisamente lo
              que la hace efectiva. Está diseñada para personas que tienen{" "}
              <strong className="font-medium text-ink">metas claras, se toman en serio su presencia</strong> y entienden
              que la imagen coherente no es un lujo: es una ventaja competitiva.
            </p>
          </AnimatedSection>

          {/* Perfiles de cliente — carrusel */}
          <div>
            <Carrusel
              mode="autoscroll"
              slidesPerView={{ default: 1, sm: 2, lg: 3 }}
              nodes={profiles.map((p) => (
                <div
                  key={p.title}
                  className="bg-white p-8 hover:bg-[#fafafa] transition-colors duration-200 h-full border-r border-edge"
                >
                  <h3 className="font-body font-medium text-[11px] tracking-[0.12em] uppercase text-ink mb-3">
                    {p.title}
                  </h3>
                  <p className="font-heading text-[18px] italic text-mid mb-3 leading-snug">
                    {p.pain}
                  </p>
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── 3. SERVICIOS ────────────────────────────────────────── */}
      <section id="servicios" className="py-20 md:py-28 bg-white" style={{background: "linear-gradient(to bottom, #f9f9f9 0%, #fff 100%)"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14 space-y-4 max-w-3xl mx-auto">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle">
              Servicios de asesoría de imagen online
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              ¿Qué es la asesoría de imagen personal?
            </h2>
            <div className="w-7 h-px bg-ink mx-auto" />
            <p className="font-body font-light text-[15px] leading-[1.9] text-mid">
              Va mucho más allá de la ropa o la moda. Es un análisis estratégico y
              profundamente personalizado de tu{" "}
              <strong className="font-medium text-ink">colorimetría, morfología, estilo de vida y comunicación visual</strong>{" "}
              — diseñado para que proyectes una imagen coherente, auténtica y alineada con tus metas.
            </p>
          </AnimatedSection>

          {/* Cuadrícula de servicios */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1px", background: "#E0E0E0" }}
          >
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 60}>
                <div className="bg-white p-8 md:p-10 hover:bg-[#fafafa] transition-colors duration-200 h-full flex flex-col">
                  <span className="text-ink mb-5 block">{s.icon}</span>
                  <h3 className="font-body font-medium text-[11px] tracking-[0.12em] uppercase text-ink mb-3">
                    {s.title}
                  </h3>
                  <p className="font-body font-light text-sm leading-[1.8] text-mid">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={120} className="text-center mt-12">
            <a
              href="#paquetes"
              className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-ink border-b border-ink pb-px hover:text-mid hover:border-mid transition-colors duration-200"
            >
              Ver paquetes y precios →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4. SOBRE MÍ ─────────────────────────────────────────── */}
      <section id="sobre-mi" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              {/* TODO: reemplazar por la foto definitiva de Carolina si hay una nueva */}
              <Image
                src="/hero/quiensoy.png"
                alt="Carolina Salazar, asesora de imagen internacional"
                width={1080}
                height={1350}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full aspect-[4/5] object-cover"
              />
            </AnimatedSection>

            {/* TODO: revisar y ajustar este texto con la bio real de Carolina */}
            <AnimatedSection delay={100}>
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
                Sobre mí
              </p>
              <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1] mb-5">
                Carolina Salazar
              </h2>
              <div className="w-7 h-px bg-ink mb-6" />
              <p className="font-body font-light text-[15px] leading-[1.9] text-mid mb-5">
                Soy <strong className="font-medium text-ink">consultora de imagen certificada</strong>, 
                especializada en imagen personal, profesional y empresarial. Trabajo de forma 100% online 
                con profesionales, líderes y emprendedores de todo el mundo de habla hispana que saben que 
                su presencia visual es parte de su estrategia — no un accesorio.
              </p>
              <p className="font-body font-light text-[15px] leading-[1.9] text-mid mb-8">
                Mi enfoque no es sobre moda ni tendencias. Es sobre identidad: entender quién eres, dónde 
                vas y asegurarte de que tu imagen trabaje a tu favor antes de que abras la boca.
              </p>
              <p className="font-body font-light text-[15px] leading-[1.9] text-mid mb-8">
                Cada proceso es profundamente personalizado — porque no existe una fórmula universal para 
                proyectar autoridad, autenticidad y presencia. Lo que sí existe es un método. Y ese método es Piel Pantera.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-9 py-4 border border-ink text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-all duration-200"
              >
                <IconWhatsApp size={16} />
                Hablemos de tu imagen
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 5. PAQUETES ─────────────────────────────────────────── */}
      <section id="paquetes" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-12">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Consultoría de imagen
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              Paquetes de asesoría
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          {/* Package cards */}
          <div className="grid md:grid-cols-3 items-end">
            {/* Esencial */}
            <AnimatedSection delay={0}>
              <div className="bg-white p-8 md:p-10 relative hover:bg-[#fafafa] transition-colors duration-200 h-full">
                <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-mid border border-edge px-3 py-1 mb-6">
                  Esencial
                </span>
                <h3 className="font-heading text-[28px] font-normal text-ink leading-tight mb-2">
                  Imagen Esencial
                </h3>
                <p className="font-heading text-[36px] font-normal text-ink mb-1">₡85.000</p>
                <p className="font-body font-light text-xs text-subtle tracking-wide mb-6">Tu punto de partida.</p>
                <p className="font-body font-light text-sm leading-[1.8] text-mid mb-6">
                  Para quienes quieren comenzar su proceso de transformación con bases sólidas.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Entrevista inicial y análisis de objetivos",
                    "Análisis de morfología corporal",
                    "Colorimetría personal básica",
                    "Guía de recomendaciones esencial",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0"><Check size={16} strokeWidth={1.5} className="text-ink" /></span>
                      <span className="font-body font-light text-sm leading-[1.7] text-mid">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body font-light text-xs text-subtle tracking-wide uppercase mb-6">Modalidad: Online</p>
                <a
                  href={AGENDA_URL}
                  className="block w-full text-center py-4 border border-ink text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-all duration-200"
                >
                  Empezar mi transformación
                </a>
              </div>
            </AnimatedSection>

            {/* Profesional — FEATURED */}
            <AnimatedSection delay={80}>
              <div className="bg-ink p-8 md:p-10 relative md:-mt-6 shadow-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-white border border-white/30 px-3 py-1">
                    Profesional
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-[10px] text-white/50 tracking-wide">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    Más elegido
                  </span>
                </div>
                <h3 className="font-heading text-[28px] font-normal text-white leading-tight mb-2">
                  Imagen Profesional
                </h3>
                <p className="font-heading text-[36px] font-normal text-white mb-1">₡165.000</p>
                <p className="font-body font-light text-xs text-white/40 tracking-wide mb-6">La inversión que tu presencia merece.</p>
                <p className="font-body font-light text-sm leading-[1.8] text-white/70 mb-6">
                  Para profesionales y emprendedores que desean proyectar seguridad, coherencia y credibilidad.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Todo lo incluido en el Paquete Esencial",
                    "Análisis facial completo",
                    "Definición de estilo personal o profesional",
                    "Guía visual avanzada con ejemplos prácticos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0">
                        <Check size={16} strokeWidth={1.5} className="text-white" />
                      </span>
                      <span className="font-body font-light text-sm leading-[1.7] text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body font-light text-xs text-white/30 tracking-wide uppercase mb-6">Modalidad: Online</p>
                <a
                  href={AGENDA_URL}
                  className="block w-full text-center py-4 bg-white text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors duration-200"
                >
                  Proyectar mi imagen con confianza
                </a>
              </div>
            </AnimatedSection>

            {/* Premium */}
            <AnimatedSection delay={160}>
              <div className="bg-white p-8 md:p-10 relative hover:bg-[#fafafa] transition-colors duration-200 h-full">
                <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-mid border border-edge px-3 py-1 mb-6">
                  Premium
                </span>
                <h3 className="font-heading text-[28px] font-normal text-ink leading-tight mb-2">
                  Imagen Empresarial
                </h3>
                <p className="font-heading text-[36px] font-normal text-ink mb-1">₡290.000</p>
                <p className="font-body font-light text-xs text-subtle tracking-wide mb-6">Proceso completo, resultados que se ven.</p>
                <p className="font-body font-light text-sm leading-[1.8] text-mid mb-6">
                  Para líderes, ejecutivos y marcas personales que requieren imagen alineada a su rol y objetivos.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Asesoría integral completa",
                    "Estrategia de imagen profesional",
                    "Personal Shopper (online o híbrido)",
                    "Seguimiento personalizado extendido",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0"><Check size={16} strokeWidth={1.5} className="text-ink" /></span>
                      <span className="font-body font-light text-sm leading-[1.7] text-mid">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body font-light text-xs text-subtle tracking-wide uppercase mb-6">Modalidad: Online / Híbrido</p>
                <a
                  href={AGENDA_URL}
                  className="block w-full text-center py-4 border border-ink text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-all duration-200"
                >
                  Quiero una imagen que lidere
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Urgency + Personal Shopper add-on */}
          <AnimatedSection delay={100}>
            <div className="mt-8 text-center">
              <p className="font-body font-light text-sm text-subtle tracking-wide">
                <span className="relative inline-flex h-1.5 w-1.5 mr-2 align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-30" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-ink" />
                </span>
                Cupos limitados por mes — agenda con anticipación
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 6. PASO A PASO ──────────────────────────────────────── */}
      <section id="proceso" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Metodología
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              El proceso paso a paso
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          {/* Cuadrícula de 7 pasos + celda de cierre */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "1px", background: "#E0E0E0" }}
          >
            {steps.map((s, i) => (
              <AnimatedSection key={s.number} delay={i * 50}>
                <div className="bg-white p-8 h-full relative overflow-hidden hover:bg-[#fafafa] transition-colors duration-200">
                  <span
                    className="absolute right-4 top-4 font-heading text-[56px] font-normal leading-none text-edge select-none pointer-events-none"
                    aria-hidden
                  >
                    {s.number}
                  </span>
                  <span className="font-body text-[10px] tracking-[0.14em] uppercase text-subtle mb-4 block relative z-10">
                    Paso {s.number}
                  </span>
                  <h3 className="font-heading text-[22px] font-normal text-ink mb-3 leading-snug relative z-10">
                    {s.title}
                  </h3>
                  <p className="font-body font-light text-sm leading-[1.8] text-mid relative z-10">
                    {s.description}
                  </p>
                </div>
              </AnimatedSection>

            ))}
            <div className="bg-white p-8 h-full relative overflow-hidden" />
          </div>
        </div>
      </section>

      {/* ── 7. MODALIDAD ONLINE ─────────────────────────────────── */}
      <section id="online" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-ink mb-6">
              <Globe size={30} strokeWidth={1} />
            </span>
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Dónde estés
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              Asesoría 100% online,<br />sin límites de ubicación.
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          {/* 3 pilares — íconos rediseñados */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 mb-14"
            style={{ gap: "1px", background: "#E0E0E0" }}
          >
            {[
              {
                title: "Personalizada",
                desc: "Cada proceso es único. No hay plantillas ni fórmulas genéricas — tu asesoría se construye 100% sobre quién eres tú.",
                icon: <Fingerprint size={30} strokeWidth={1} />,
              },
              {
                title: "Acompañamiento Real",
                desc: "No recibes un PDF y te quedas sola. Hay sesiones en vivo, retroalimentación directa y seguimiento en cada etapa del proceso.",
                icon: <Handshake size={30} strokeWidth={1} />,
              },
              {
                title: "Resultados Concretos",
                desc: "Terminas con una guía visual lista para usar, claridad absoluta sobre qué te funciona y la confianza de proyectarte con coherencia.",
                icon: <Target size={30} strokeWidth={1} />,
              },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white p-8 md:p-10 hover:bg-[#fafafa] transition-colors duration-200">
                <span className="text-ink mb-6 block">{pillar.icon}</span>
                <h3 className="font-body font-medium text-[11px] tracking-[0.12em] uppercase text-ink mb-3">
                  {pillar.title}
                </h3>
                <p className="font-body font-light text-sm leading-[1.8] text-mid">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Tools block */}
          <AnimatedSection delay={100}>
            <div className="bg-ink p-10 md:p-14 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/50 mb-6">
                  Herramientas de trabajo
                </p>
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {[
                    { name: "Videollamadas", subtitle: "Zoom · Google Meet", icon: <Video size={22} strokeWidth={1.5} /> },
                    { name: "Análisis fotográfico", subtitle: "Fotografías de alta calidad", icon: <Camera size={22} strokeWidth={1.5} /> },
                    { name: "Guías visuales", subtitle: "Canva · Google Drive", icon: <FileText size={22} strokeWidth={1.5} /> },
                    { name: "Seguimiento", subtitle: "WhatsApp directo", icon: <MessageSquare size={22} strokeWidth={1.5} /> },
                  ].map((tool) => (
                    <div key={tool.name} className="flex flex-col gap-2 p-4 bg-ink hover:bg-white/5 transition-colors duration-200">
                      <span className="text-white/60">{tool.icon}</span>
                      <p className="font-body font-medium text-sm text-white">{tool.name}</p>
                      <p className="font-body font-light text-xs text-white/40">{tool.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Image
                  src="/hero/online.svg"
                  alt="Sesión de asesoría de imagen por videollamada"
                  width={1350}
                  height={1080}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full aspect-[5/4] object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 8. TESTIMONIOS ──────────────────────────────────────── */}
      <section id="testimonios" className="border-t border-edge bg-ink">
        {/* Resultados */}
        <div className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <AnimatedSection className="text-center mb-12">
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
                Resultados
              </p>
              <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
                Lo que te llevas
              </h2>
              <div className="w-7 h-px bg-ink mx-auto mt-5" />
            </AnimatedSection>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "1px", background: "#E0E0E0" }}
            >
              {benefits.map((b, i) => (
                <AnimatedSection key={b.title} delay={i * 60}>
                  <div className="bg-white p-6 hover:bg-[#fafafa] transition-colors duration-200 h-full">
                    <p className="font-body font-medium text-[11px] tracking-[0.12em] uppercase text-ink mb-2">
                      {b.title}
                    </p>
                    <p className="font-body font-light text-sm leading-[1.8] text-mid">{b.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="relative py-20 md:py-28 overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
            <AnimatedSection className="text-center mb-14">
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/50 mb-4">
                Prueba social
              </p>
              <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-white leading-[1.1]">
                Testimonios de clientes
              </h2>
              <div className="w-7 h-px bg-white/60 mx-auto mt-5" />
            </AnimatedSection>

            <AnimatedSection
              delay={100}
              style={{ "--carrusel-ctl": "255, 255, 255" } as React.CSSProperties}
            >
              <Carrusel nodes={testimonialSlides} slidesPerView={1} mode="autoplay" />
            </AnimatedSection>

            <AnimatedSection delay={200} className="text-center mt-12">
              <p className="font-body font-light text-[15px] text-white/70 mb-6">
                ¿Lista para escribir tu propio caso de éxito?
              </p>
              <a
                href={AGENDA_URL}
                className="inline-block px-10 py-4 bg-white text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors duration-200"
              >
                Agendar mi asesoría
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Dudas frecuentes
            </p>
            <h2 className="font-heading text-[clamp(28px,4vw,44px)] font-normal text-ink leading-[1.1]">
              Preguntas frecuentes sobre asesoría de imagen
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <FAQAccordion />
          </AnimatedSection>

          <AnimatedSection delay={200} className="text-center mt-14">
            <p className="font-body font-light text-[15px] text-mid mb-6">
              ¿Tienes otra pregunta? Escríbeme directamente — respondo en menos de 24 horas.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-ink text-white font-body text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200"
            >
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-ink">
        {/* Footer body */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-1">
              <p className="font-heading text-[22px] font-normal text-white mb-1">Carolina Salazar</p>
              <p className="font-body font-light text-sm leading-[1.8] text-white/40 mb-6">
                Consultora de imagen personal, profesional y empresarial online.
                Acompañando a líderes, profesionales y emprendedores a proyectar su mejor versión.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/pielpanteracollections" aria-label="Instagram de Piel Pantera" className="text-white/30 hover:text-white/70 transition-colors duration-200">
                  <IconInstagram />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Piel Pantera" className="text-white/30 hover:text-white/70 transition-colors duration-200">
                  <IconWhatsApp size={18} />
                </a>
              </div>
            </div>

            {[
              {
                label: "Servicios",
                links: [
                  { label: "Todos los servicios", href: "#servicios" },
                  { label: "¿Para quién es?", href: "#proposito" },
                  { label: "Sobre mí", href: "#sobre-mi" },
                  { label: "Modalidad Online", href: "#online" },
                ],
              },
              {
                label: "Paquetes",
                links: [
                  { label: "Imagen Esencial", href: "#paquetes" },
                  { label: "Imagen Profesional", href: "#paquetes" },
                  { label: "Imagen Empresarial", href: "#paquetes" },
                  { label: "Personal Shopper", href: "#paquetes" },
                ],
              },
              {
                label: "Contacto",
                links: [
                  { label: "Agendar sesión", href: AGENDA_URL },
                  { label: "Proceso", href: "#proceso" },
                  { label: "Testimonios", href: "#testimonios" },
                  { label: "Preguntas frecuentes", href: "#faq" },
                  { label: "WhatsApp directo", href: WHATSAPP_URL, external: true },
                ],
              },
            ].map((col) => (
              <div key={col.label}>
                <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-4">{col.label}</p>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={"external" in link && link.external ? "_blank" : undefined}
                    rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                    className="block font-body font-light text-sm text-white/40 hover:text-white/70 transition-colors mb-2.5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body font-light text-xs text-white/25">
              © 2025 Piel Pantera Collections. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Privacidad", href: "/privacidad" },
                { label: "Términos", href: "/terminos" },
                { label: "Cookies", href: "/cookies" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="font-body font-light text-xs text-white/20 hover:text-white/50 transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="#inicio" className="font-body font-light text-xs text-white/20 hover:text-white/50 transition-colors">
                ↑ Inicio
              </a>
            </div>
            <p className="font-body font-light text-xs text-white/15">
              Carolina Salazar · Consultora de Imagen Estratégica
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP BUTTON ─────────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="whatsapp-float fixed bottom-6 right-6 z-50 w-14 h-14 bg-ink text-white flex items-center justify-center hover:bg-[#333] transition-colors duration-200"
      >
        <IconWhatsApp size={26} />
      </a>
    </>
  );
}
