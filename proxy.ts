import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Modo mantenimiento.

   Se activa con MAINTENANCE_MODE=true (sin NEXT_PUBLIC_: solo se lee en el
   servidor, así el hosting puede encenderlo y apagarlo sin rebuild).

   En Next 16 el archivo `middleware.ts` está deprecado y la convención es
   `proxy.ts`. Ver node_modules/next/dist/docs/01-app/03-api-reference/
   03-file-conventions/proxy.md */

const MAINTENANCE_PATH = "/mantenimiento";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  // Evita el bucle de reescritura sobre la propia página de mantenimiento.
  if (request.nextUrl.pathname === MAINTENANCE_PATH) {
    return NextResponse.next();
  }

  /* Reescribir (no redirigir) conserva la URL original en la barra del
     navegador, así el visitante puede recargar y volver a entrar cuando el
     modo se apague.

     `rewrite()` no acepta un status en Next 16, de modo que no se puede
     responder 503; el noindex es lo que evita que Google se quede con la
     página de mantenimiento cacheada en su índice. */
  return NextResponse.rewrite(new URL(MAINTENANCE_PATH, request.url), {
    headers: { "x-robots-tag": "noindex" },
  });
}

export const config = {
  /* Deja pasar los assets: sin esto la propia página de mantenimiento se
     quedaría sin las imágenes del hero ni los fuentes. */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|avif|woff|woff2|ttf)$).*)",
  ],
};
