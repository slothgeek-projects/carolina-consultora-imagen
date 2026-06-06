"use client";

import { useState } from "react";

const steps = [
  { number: "01", title: "Entrevista inicial", description: "Conocemos tu historia, objetivos, estilo actual y lo que deseas transformar." },
  { number: "02", title: "Definición de objetivos", description: "Establecemos metas claras según tu contexto personal, profesional o empresarial." },
  { number: "03", title: "Análisis corporal y morfología", description: "Medidas, proporciones, postura y biotipo corporal para recomendaciones precisas." },
  { number: "04", title: "Análisis facial", description: "Forma del rostro, facciones y armonía para definir cortes, estilos y accesorios." },
  { number: "05", title: "Colorimetría personal", description: "Identificación de tonos, subtonos y paleta ideal que potencie tu imagen." },
  { number: "06", title: "Diagnóstico y retroalimentación", description: "Revisión integral del análisis y ajustes personalizados contigo." },
  { number: "07", title: "Guía de recomendaciones", description: "Prendas, colores, accesorios, maquillaje y cabello: tu manual personalizado." },
];

export default function ProcessSlider() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : steps.length - 1));
  const next = () => setCurrent((c) => (c < steps.length - 1 ? c + 1 : 0));

  return (
    <div className="relative">
      <div className="bg-white border border-edge px-8 py-12 md:px-16 md:py-16 min-h-[280px] flex flex-col justify-center relative overflow-hidden">
        <span
          className="absolute right-6 top-1/2 -translate-y-1/2 font-heading text-[120px] font-normal leading-none text-edge select-none pointer-events-none"
          aria-hidden
        >
          {steps[current].number}
        </span>
        <span className="font-body text-[10px] tracking-[0.14em] uppercase text-subtle mb-4">
          Paso {steps[current].number} de {steps.length}
        </span>
        <h3 className="font-heading text-3xl md:text-4xl font-normal text-ink mb-4 leading-snug relative z-10">
          {steps[current].title}
        </h3>
        <p className="font-body font-light text-base leading-[1.8] text-mid max-w-xl relative z-10">
          {steps[current].description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir al paso ${i + 1}`}
              className={`transition-all duration-300 ${
                i === current ? "w-8 h-1 bg-ink" : "w-4 h-1 bg-edge hover:bg-mid"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          {[{ fn: prev, label: "Paso anterior", rotate: true }, { fn: next, label: "Siguiente paso", rotate: false }].map(
            ({ fn, label, rotate }) => (
              <button
                key={label}
                onClick={fn}
                aria-label={label}
                className="w-10 h-10 border border-edge flex items-center justify-center text-mid hover:border-ink hover:text-ink transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={rotate ? "rotate-180" : ""}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
