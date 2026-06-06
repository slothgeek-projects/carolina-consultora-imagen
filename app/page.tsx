import Nav from "./components/Nav";
import AnimatedSection from "./components/AnimatedSection";

import FAQAccordion from "./components/FAQAccordion";
import Carrusel from "./components/carrusel";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/50670170734?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20la%20asesor%C3%ADa%20de%20imagen.";
const AGENDA_URL = "/agendar";

const IconVideo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="7" width="15" height="12" rx="2" /><path d="m17 12 5-3v10l-5-3" />
  </svg>
);
const IconCamera = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" />
  </svg>
);
const IconFile = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
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
const IconCheck = ({ color = "currentColor" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8l4 4 6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ImgPlaceholder({ label, note, className = "aspect-[4/5]" }: { label: string; note: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#f4f4f4] ${className}`} role="img" aria-label={label}>
      {/* TODO: Replace with <Image src="…" fill alt="…" className="object-cover" /> */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-subtle p-6">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden>
          <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 26l9-7 6 5 5-4 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] tracking-widest uppercase text-center leading-relaxed">{note}</span>
      </div>
    </div>
  );
}

const profiles = [
  {
    title: "Profesionales en ascenso",
    pain: "Tu cargo ya es sólido, pero tu imagen todavía no refleja el nivel que alcanzaste.",
    desc: "Para quienes buscan proyectar seguridad y credibilidad proporcional a su trayectoria profesional.",
  },
  {
    title: "Ejecutivos y Líderes",
    pain: "Lideras equipos, pero tu imagen aún no está liderando contigo.",
    desc: "Para directores, gerentes y líderes que necesitan una presencia que proyecte autoridad real desde la primera mirada.",
  },
  {
    title: "Emprendedores y Marcas Personales",
    pain: "Eres tu propio negocio. Tu imagen debe construir tu marca antes de que hables.",
    desc: "Para emprendedores cuya imagen personal es su principal activo comercial y de diferenciación.",
  },
  {
    title: "En Transición Personal o Profesional",
    pain: "Estás en un nuevo capítulo. Tu imagen debe acompañar quién estás siendo hoy.",
    desc: "Para quienes viven cambios de carrera, nuevas etapas de vida o quieren redescubrir su estilo personal auténtico.",
  },
  {
    title: "Empresas y Equipos",
    pain: "Tu empresa proyecta lo que proyectan las personas que la representan.",
    desc: "Para marcas que desean fortalecer la imagen de su equipo de cara a clientes, inversores y mercado.",
  },
];

const steps = [
  { number: "01", title: "Entrevista inicial", description: "Conocemos tu historia, objetivos, estilo actual y lo que deseas transformar." },
  { number: "02", title: "Definición de objetivos", description: "Establecemos metas claras según tu contexto personal, profesional o empresarial." },
  { number: "03", title: "Análisis corporal y morfología", description: "Medidas, proporciones, postura y biotipo corporal para recomendaciones precisas." },
  { number: "04", title: "Análisis facial", description: "Forma del rostro, facciones y armonía para definir cortes, estilos y accesorios." },
  { number: "05", title: "Colorimetría personal", description: "Identificación de tonos, subtonos y paleta ideal que potencie tu imagen." },
  { number: "06", title: "Diagnóstico y retroalimentación", description: "Revisión integral del análisis y ajustes personalizados contigo." },
  { number: "07", title: "Guía de recomendaciones", description: "Prendas, colores, accesorios, maquillaje y cabello: tu manual personalizado." },
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
  <div key="t1" className="bg-white border border-edge p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-edge leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-mid pt-6 mb-8">
      Siempre sentí que mi ropa no me representaba del todo. Después de la asesoría llegué a reuniones importantes sintiéndome la{" "}
      <strong className="font-medium text-ink">versión más poderosa de mí misma</strong>. El cambio fue inmediato — no solo en cómo me veía, sino en cómo me percibían los demás.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-edge flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-subtle text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-ink">Ana Laura M.</p>
        <p className="font-body font-light text-xs text-subtle tracking-wide uppercase mt-0.5">Directora de Marketing</p>
      </div>
    </div>
  </div>,

  <div key="t2" className="bg-white border border-edge p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-edge leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-mid pt-6 mb-8">
      <strong className="font-medium text-ink">Gasto la mitad y me siento el doble de segura.</strong> Carolina me enseñó exactamente qué prendas funcionan para mi cuerpo, mi colorimetría y mis objetivos. Por primera vez en mi vida compro con criterio, no por impulso.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-edge flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-subtle text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-ink">Valeria R.</p>
        <p className="font-body font-light text-xs text-subtle tracking-wide uppercase mt-0.5">Emprendedora</p>
      </div>
    </div>
  </div>,

  <div key="t3" className="bg-white border border-edge p-8 md:p-12 relative">
    <div className="absolute top-6 left-8 font-heading text-5xl text-edge leading-none select-none" aria-hidden>&ldquo;</div>
    <p className="font-body font-light text-base leading-[1.9] text-mid pt-6 mb-8">
      Como ejecutivo nunca le había dado importancia real a la imagen. Hoy entiendo que era{" "}
      <strong className="font-medium text-ink">mi activo más desaprovechado</strong>. Después de la asesoría, varios clientes comentaron que notaron algo diferente — más presencia, más autoridad.
    </p>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[#f4f4f4] border border-edge flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-subtle text-xs">Foto</div>
      </div>
      <div>
        <p className="font-body font-medium text-sm text-ink">Ricardo F.</p>
        <p className="font-body font-light text-xs text-subtle tracking-wide uppercase mt-0.5">Gerente General</p>
      </div>
    </div>
  </div>,
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section id="inicio" className="relative min-h-screen flex max-w-7xl mx-auto">
        <Image src="/hero/bg.svg" alt="Hero" className="absolute top-0 left-0 w-full h-full object-cover" width={1920} height={1080} />

        <div className="relative grid w-full" style={{ gridTemplateColumns: "60fr 40fr" }}>
          {/* Left — text, white bg */}
          <div className="flex flex-col justify-end px-10 lg:px-16 pt-36 pb-16">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-7">
              Carolina Salazar · Consultora de Imagen Profesional
            </p>
            <h1 className="font-heading text-[clamp(44px,5.5vw,70px)] font-normal leading-[1.02] tracking-[-0.01em] text-ink mb-7">
              Transforma tu imagen. Proyecta seguridad.{" "}
              <em className="italic text-mid">Refleja exactamente quién eres.</em>
            </h1>
            <div className="w-8 h-px bg-ink mb-6" />
            <p className="font-body font-light text-[15px] leading-[1.85] text-mid max-w-[420px] mb-9">
              Asesoría de Imagen Personal, Profesional y Empresarial online. Un proceso
              integral que alinea tu presencia visual con tu identidad, tus metas y el
              nivel que ya tienes — para que cada espacio que ocupes comunique exactamente
              quién eres.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={AGENDA_URL} className="inline-block px-8 py-4 bg-ink text-white font-body text-[10px] tracking-[0.14em] uppercase hover:bg-[#333] transition-colors duration-200">
                Agendar mi asesoría
              </a>
              <a href="#paquetes" className="inline-block px-8 py-4 border border-edge text-ink font-body text-[10px] tracking-[0.14em] uppercase hover:border-ink transition-colors duration-200">
                Ver paquetes
              </a>
            </div>
            <div className="flex items-center gap-3 mt-auto pt-10 font-body text-[9px] tracking-[0.16em] uppercase text-subtle">
              <div className="w-7 h-px bg-edge" />
              <span>Descubrir</span>
            </div>
          </div>


        </div>
      </section>

      {/* ── 2. ¿QUÉ ES LA ASESORÍA? ─────────────────────────────── */}
      <section id="servicios" className="relative py-20 md:py-28 bg-white" style={{ background: "linear-gradient(to right, transparent 50%, var(--color-ink) 50%)" }}>
        <Image src="/hero/que-es.svg" alt="Hero" className="absolute top-0 left-0 w-1/2 h-full object-cover" width={1000} height={1000} />
        <div className="relative grid grid-cols-2 max-w-7xl mx-auto">
          <div>

          </div>
          <AnimatedSection className="space-y-5 px-12">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white">
              ¿Qué es la Asesoría de Imagen personal?
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-white leading-[1.1]">
              La asesoría de imagen es el proceso más poderoso para alinear{" "}
              <em className="italic text-white">cómo te ves</em> y{" "}
              <em className="italic text-white">quién realmente eres</em>
            </h2>
            <div className="w-7 h-px bg-ink" />
            <p className="font-body font-light text-[15px] leading-[1.9] text-white max-w-2xl mx-auto">
              Va mucho más allá de la ropa o la moda. Es un análisis estratégico y
              profundamente personalizado de tu{" "}
              <strong className="font-medium text-white">colorimetría, morfología, estilo de vida y comunicación visual</strong>{" "}
              — diseñado para que proyectes una imagen coherente, auténtica y alineada con tus metas.
            </p>
            <blockquote className="font-heading text-[22px] italic text-white leading-relaxed max-w-xl mx-auto border-l border-white pl-6 text-left my-6">
              &ldquo;No se trata de cambiar quién eres,<br />
              se trata de que el mundo vea lo que tú ya eres.&rdquo;
            </blockquote>
            <a
              href="#paquetes"
              className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-white border-b border-edge pb-px hover:border-ink transition-colors duration-200"
            >
              Conocer los servicios →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 3. ¿PARA QUIÉN? ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14 space-y-4 max-w-3xl mx-auto">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle">
              Servicios de asesoría de imagen online
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

          {/* 5 profile cards — autoscroll carousel */}
          <div className="mb-14">
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
                  <p className="font-body font-light text-sm leading-[1.8] text-subtle">
                    {p.desc}
                  </p>
                </div>
              ))}
            />
          </div>
        </div>
      </section>
      <section className="bg-ink text-white" style={{ backgroundImage: "url(/hero/bg-decorator-phanter.png)", backgroundPosition: 'left', backgroundRepeat: 'no-repeat', backgroundSize: "auto 100%", backgroundBlendMode: "color-dodge" }}>
        {/* Quote band */}
        <AnimatedSection>
          <div className="text-center py-14 border-edge">
            <p className="font-heading text-[22px] md:text-[28px] italic">
              &ldquo;Si ya sabes quién eres, es hora de que el mundo también lo vea.&rdquo;
            </p>
            <div className="mt-8">
              <a
                href={AGENDA_URL}
                className="inline-block px-10 py-4 bg-white text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200"
              >
                Agendar mi asesoría
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>
      {/* ── 4. PROCESO ──────────────────────────────────────────── */}
      <section id="proceso" className="py-20 md:py-28 bg-white">
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
          <AnimatedSection delay={100}>
            <div className="max-w-2xl mx-auto">
              <Carrusel
                mode="autoplay"
                slidesPerView={1}
                nodes={steps.map((s) => (
                  <div
                    key={s.number}
                    className="bg-white border border-edge px-8 py-12 md:px-16 md:py-16 min-h-[280px] flex flex-col justify-center relative overflow-hidden"
                  >
                    <span
                      className="absolute right-6 top-1/2 -translate-y-1/2 font-heading text-[120px] font-normal leading-none text-edge select-none pointer-events-none"
                      aria-hidden
                    >
                      {s.number}
                    </span>
                    <span className="font-body text-[10px] tracking-[0.14em] uppercase text-subtle mb-4">
                      Paso {s.number} de {steps.length}
                    </span>
                    <h3 className="font-heading text-3xl md:text-4xl font-normal text-ink mb-4 leading-snug relative z-10">
                      {s.title}
                    </h3>
                    <p className="font-body font-light text-base leading-[1.8] text-mid max-w-xl relative z-10">
                      {s.description}
                    </p>
                  </div>
                ))}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 5. MODALIDAD ONLINE ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Dónde estés
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              Asesoría 100% online,<br />sin límites de ubicación.
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          {/* 3 pillars */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 mb-14"
            style={{ gap: "1px", background: "#E0E0E0" }}
          >
            {[
              {
                title: "Personalizada",
                desc: "Cada proceso es único. No hay plantillas ni fórmulas genéricas — tu asesoría se construye 100% sobre quién eres tú.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><circle cx="12" cy="8" r="5" /><path d="M3 21a9 9 0 0 1 18 0" /></svg>,
              },
              {
                title: "Acompañamiento Real",
                desc: "No recibes un PDF y te quedas sola. Hay sesiones en vivo, retroalimentación directa y seguimiento en cada etapa del proceso.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              },
              {
                title: "Resultados Concretos",
                desc: "Terminas con una guía visual lista para usar, claridad absoluta sobre qué te funciona y la confianza de proyectarte con coherencia.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden={true}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
              },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white p-8 hover:bg-[#fafafa] transition-colors duration-200">
                <span className="text-ink mb-4 block">{pillar.icon}</span>
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
                    { name: "Videollamadas", subtitle: "Zoom · Google Meet", icon: <IconVideo /> },
                    { name: "Análisis fotográfico", subtitle: "Fotografías de alta calidad", icon: <IconCamera /> },
                    { name: "Guías visuales", subtitle: "Canva · Google Drive", icon: <IconFile /> },
                    { name: "Seguimiento", subtitle: "WhatsApp directo", icon: <IconChat /> },
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
                  src='hero/online.svg'
                  alt="Servicio Online"
                  width={1350}
                  height={1080}
                  className="aspect-[5/4]"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 6. PAQUETES ─────────────────────────────────────────── */}
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
                      <span className="mt-0.5 flex-shrink-0"><IconCheck /></span>
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
                        <IconCheck color="#ffffff" />
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
                      <span className="mt-0.5 flex-shrink-0"><IconCheck /></span>
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

            {/* Personal Shopper add-on */}
            <div className="mt-10 border border-edge relative">
              <div className="grid grid-cols-2 items-center">
                <Image src={`/hero/personal-shopper.svg`} alt="Personal Shopper" width={1000} height={1000} className="aspect-[5/4]" />
                <div className="max-w-2xl mx-auto text-center p-8 md:p-10 ">
                  <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase text-ink border border-edge px-3 py-1 mb-4">
                    Add-on · Personal Shopper
                  </span>
                  <h3 className="font-heading text-[24px] md:text-[28px] font-normal text-ink mb-4">
                    Saber es solo el primer paso.
                  </h3>
                  <p className="font-body font-light text-[15px] leading-[1.9] text-mid mb-6">
                    El Personal Shopper te acompaña a aplicar lo aprendido: seleccionamos juntas prendas
                    específicas que funcionan para tu cuerpo, tu colorimetría y tus objetivos, de forma
                    online o híbrida. Disponible como complemento de cualquier paquete.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 border border-ink text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-ink hover:text-white transition-all duration-200"
                  >
                    <IconWhatsApp size={16} />
                    Consultar sobre Personal Shopper
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 7. TESTIMONIOS ──────────────────────────────────────────────── */}
      <section id="testimonios" className="py-20 md:py-28 bg-white border-t border-edge">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-subtle mb-4">
              Prueba social
            </p>
            <h2 className="font-heading text-[clamp(30px,4vw,46px)] font-normal text-ink leading-[1.1]">
              Testimonios de clientes
            </h2>
            <div className="w-7 h-px bg-ink mx-auto mt-5" />
          </AnimatedSection>

          {/* 6 benefit cards — 1px grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-14"
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

          {/* Testimonials carousel */}
          <AnimatedSection delay={100}>
            <Carrusel nodes={testimonialSlides} slidesPerView={1} mode="autoplay" />
          </AnimatedSection>

          <AnimatedSection delay={200} className="text-center mt-12">
            <p className="font-body font-light text-[15px] text-mid mb-6">
              ¿Lista para escribir tu propio caso de éxito?
            </p>
            <a
              href={AGENDA_URL}
              className="inline-block px-10 py-4 bg-ink text-white font-body text-[10px] tracking-[0.08em] uppercase hover:bg-[#333] transition-colors duration-200"
            >
              Agendar mi asesoría
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────── */}
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

      {/* ── 9. CTA FINAL ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ink border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-white/20" />
              <div className="w-1 h-1 bg-white/40 rotate-45" />
              <div className="h-px w-16 bg-white/20" />
            </div>
            <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/40 mb-4">
              Modalidad online · Sin compromiso
            </p>
            <h2 className="font-heading text-[clamp(32px,4.5vw,52px)] font-normal text-white leading-[1.1] mb-6">
              Tu imagen ya está lista para reflejarte.
              <br />
              <em className="italic text-white/60">Solo falta el primer paso.</em>
            </h2>
            <p className="font-body font-light text-[15px] leading-[1.9] text-white/55 mb-10 max-w-md mx-auto">
              Escríbeme directamente y te oriento sobre el paquete que mejor se adapta
              a tus necesidades y objetivos. Sin compromiso, respondo en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors duration-200"
              >
                <IconWhatsApp size={18} />
                Contactar por WhatsApp
              </a>
              <a
                href={AGENDA_URL}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/25 text-white font-body text-[10px] tracking-[0.08em] uppercase hover:border-white/60 transition-colors duration-200"
              >
                Agendar directamente
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#111]">
        {/* Pre-footer */}
        <div className="border-b border-white/10 bg-ink">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 md:py-18 grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-sm">
              <Image
                src='/hero/carolina.svg'
                alt="Carolina"
                width={1080}
                height={1350}
                className="aspect-[4/5]"
              />
            </div>
            <div>
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/40 mb-6">Hablemos</p>
              <h2 className="font-heading text-[28px] md:text-[36px] font-normal text-white mb-4 leading-snug">
                ¿Lista para transformar tu imagen?
              </h2>
              <p className="font-body font-light text-[15px] leading-[1.9] text-white/50 mb-8">
                Escríbeme directamente — es la forma más rápida y directa de orientarte
                sobre el paquete que mejor se adapta a ti.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-ink font-body text-[10px] tracking-[0.08em] uppercase hover:bg-white/90 transition-colors duration-200 w-fit"
                >
                  <IconWhatsApp size={18} />
                  Escribir por WhatsApp
                </a>
                <div className="flex flex-col gap-2 mt-2">
                  <p className="font-body font-light text-sm text-white/40">
                    <span className="text-white/20 mr-2">✦</span>carolina@pielpantera.com
                  </p>
                  <p className="font-body font-light text-sm text-white/40">
                    <span className="text-white/20 mr-2">✦</span>Modalidad: 100% Online · Costa Rica
                  </p>
                  <p className="font-body font-light text-sm text-white/40">
                    <span className="text-white/20 mr-2">✦</span>@carolinasalazar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  { label: "Asesoría de Imagen", href: "#servicios" },
                  { label: "¿Para quién es?", href: "#servicios" },
                  { label: "Proceso", href: "#proceso" },
                  { label: "Modalidad Online", href: "#servicios" },
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
              Carolina Salazar · Consultora de Imagen Profesional
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
