"use client";

import { useState } from "react";
import { faqItems as items } from "@/data/faq";

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-edge">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group cursor-pointer"
            >
              <span className="font-body font-medium text-[15px] sm:text-base leading-snug text-ink group-hover:text-mid transition-colors">
                {item.q}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 border border-edge flex items-center justify-center text-ink transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            {/* grid-rows 0fr→1fr en vez de max-h fija: las respuestas largas ya no
                se recortan en pantallas angostas y no hay número mágico que ajustar. */}
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-body font-light text-[15px] sm:text-base leading-[1.8] text-mid pb-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
