import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/* Los medios del blog los sirve el WordPress externo. En vez de mantener el
   dominio en dos sitios, se deriva de WP_API_URL: si la URL del CMS cambia,
   next/image sigue funcionando sin tocar este archivo. */
function patronDelCms() {
  if (!process.env.WP_API_URL) return [];

  try {
    const { protocol, hostname } = new URL(process.env.WP_API_URL);
    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
      },
    ];
  } catch {
    console.warn("[next.config] WP_API_URL no es una URL válida; se ignora.");
    return [];
  }
}

/* Config por fase: lo único que cambia entre desarrollo y producción es el
   permiso para optimizar imágenes alojadas en IPs privadas. */
export default function nextConfig(phase: string): NextConfig {
  const enDesarrollo = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    images: {
      /* Next 16 resuelve por DNS el host de cada imagen remota y, si alguna IP
         es privada, corta con 400 '"url" parameter is not allowed' ANTES de
         mirar remotePatterns (server/image-optimizer.js, fetchExternalImage).
         El WordPress de desarrollo vive en pielpantera.local → ::1, así que en
         dev hay que permitirlo explícitamente.

         En producción se queda en false a propósito: el WP real está en un
         dominio público, y activarlo convertiría el optimizador en un proxy
         hacia la red interna del servidor (SSRF). Consecuencia conocida: un
         `next build && next start` en local contra pielpantera.local seguirá
         dando 400 en las imágenes; para eso, usar `next dev`. */
      dangerouslyAllowLocalIP: enDesarrollo,
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "https",
          hostname: "officia.app",
        },
        {
          protocol: "http",
          hostname: "pielpantera.local",
        },
        {
          protocol: "https",
          hostname: "pielpantera.com",
        },
        ...patronDelCms(),
      ],
    },
  };
}
