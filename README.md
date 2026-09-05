This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Blog (WordPress headless)

El blog de `/blog` se sirve en SSR contra un WordPress externo. Requiere una
variable de entorno en `.env`:

```bash
# Base del WordPress, sin /wp-json al final
WP_API_URL=https://cms.tu-dominio.com
```

Sin esa variable las rutas de `/blog` muestran su pantalla de error y el bloque
de últimas entradas de la home simplemente no aparece; el resto del sitio no se
ve afectado.

El contrato de datos (custom post type `articulo`, taxonomía
`categoria_articulo` y campos ACF) está documentado en
`docs/superpowers/specs/2026-09-04-blog-wordpress-acf-design.md`. Toda la
comunicación con WordPress vive en `lib/wp.ts`.

Tests de los mappers de la REST:

```bash
npm test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
