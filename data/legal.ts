/* Fuente única de los tres documentos legales del sitio: Términos y
   Condiciones (/terminos), Política de Privacidad (/privacidad) y Política de
   Cookies (/cookies). Datos puros, sin JSX: el render vive en
   app/components/LegalPage.tsx, que es el único que los consume.

   TODO cliente: este texto es un punto de partida en lenguaje claro, alineado a
   la operación real, pero NO sustituye una revisión legal formal. Como el
   servicio se presta a clientes de varios países de Latinoamérica y
   Centroamérica —cada uno con su propia ley de protección al consumidor y de
   datos personales—, conviene que una persona abogada en Costa Rica lo revise
   antes de considerarlo la versión definitiva.

   TODO cliente (impuestos): la cláusula 4 de los Términos menciona al
   Ministerio de Hacienda para dejar establecido que los precios publicados ya
   son finales (impuestos incluidos), pero no fija una tarifa exacta (p. ej. IVA
   del 13%) porque el tratamiento tributario de servicios digitales exportados
   puede variar. Confirmar el porcentaje y el tratamiento correcto con
   contabilidad antes de publicar, en especial por la venta fuera de Costa Rica.

   TODO cliente (cookies): la Política de Cookies describe solo Google Analytics
   y Meta Pixel. Si se agregan otras herramientas de seguimiento (TikTok Pixel,
   LinkedIn Insight, etc.), hay que actualizar la sección 2 de ese documento. */

/** Par etiqueta + descripción, para las secciones que enumeran categorías. */
export type LegalItem = { term: string; desc: string };

/** Cada sección numerada del documento. `body` e `items` pueden convivir. */
export type LegalSection = {
  heading: string;
  body?: string[];
  items?: LegalItem[];
};

export type LegalDoc = {
  slug: string;
  /** H1 visible. */
  title: string;
  /** <title> del navegador; el template de layout.tsx le agrega el nombre. */
  metaTitle: string;
  metaDescription: string;
  /** Bajada visible bajo el H1. */
  intro: string;
  sections: LegalSection[];
};

/* Fecha de última revisión, compartida por los tres documentos.
   TODO cliente: actualizarla cuando el abogado devuelva la versión revisada. */
export const LEGAL_UPDATED = "17 de agosto de 2026";

export const CONTACT_EMAIL = "carolina@pielpantera.com";

export const terminos: LegalDoc = {
  slug: "terminos",
  title: "Términos y Condiciones",
  metaTitle: "Términos y Condiciones",
  metaDescription:
    "Términos y condiciones de los servicios de asesoría de imagen online de Carolina Salazar — Piel Pantera Collections: reservas, pagos, entregas, cancelaciones y jurisdicción.",
  intro:
    "Estas condiciones regulan todos los servicios de asesoría de imagen contratados a través de carolinaimagen.com.",
  sections: [
    {
      heading: "Objeto",
      body: [
        "Los presentes Términos y Condiciones regulan la prestación de los servicios de asesoría de imagen personal, profesional y empresarial ofrecidos por Carolina Salazar, bajo la marca Piel Pantera Collections (“el Servicio”, “nosotros”), a través del sitio web carolinaimagen.com. Al agendar y/o pagar cualquiera de nuestros servicios, la persona usuaria (“el/la cliente”) acepta expresamente estos términos.",
      ],
    },
    {
      heading: "Modalidad del servicio",
      body: [
        "Todos los servicios se prestan de forma 100% online, mediante videollamada, análisis fotográfico y guías digitales, salvo la modalidad híbrida del Personal Shopper y el acompañamiento de compras del Paquete Empresarial, sujetos a disponibilidad geográfica y previa coordinación.",
      ],
    },
    {
      heading: "Reserva y pago",
      body: [
        "La reserva de los servicios de Análisis de Colorimetría (individual e integral), Análisis Corporal y Facial, Personal Shopper e Imagen Esencial se confirma con el pago del 100% del valor del servicio.",
        "Para los paquetes Imagen Profesional e Imagen Empresarial, la reserva se confirma con el pago del 50% del valor total. El 50% restante debe cancelarse una vez completadas todas las sesiones del proceso; la guía final o Revista Personalizada correspondiente se entrega una vez cancelado el 100% del servicio.",
        "Una vez confirmada la reserva, el/la cliente recibe un cronograma del proceso completo, con las fechas propuestas para cada sesión y para la entrega de las guías correspondientes. Este cronograma puede ajustarse según disponibilidad de ambas partes.",
        "En todos los casos, una vez confirmado el pago (total o el 50% inicial), el/la cliente recibe un enlace con una breve encuesta previa a la entrevista inicial. Los precios se publican en dólares estadounidenses (USD), salvo acuerdo distinto expresado por ambas partes.",
      ],
    },
    {
      heading: "Formas y métodos de pago, impuestos y comisiones",
      body: [
        "Los pagos pueden realizarse mediante SINPE Móvil, transferencia bancaria, o PayPal (recomendado para clientes fuera de Costa Rica). Los datos exactos de cada método se comparten directamente al confirmar la reserva.",
        "Todos los precios publicados incluyen los impuestos correspondientes conforme a la normativa vigente del Ministerio de Hacienda de Costa Rica.",
        "En caso de que el pago se realice mediante PayPal, transferencia bancaria internacional, o cualquier otro medio que genere comisiones bancarias o de la plataforma de pago —dentro o fuera de Costa Rica—, dichas comisiones serán asumidas por el/la cliente y deberán sumarse al monto total a cancelar, de forma que Piel Pantera Collections reciba siempre el valor íntegro publicado para el servicio.",
      ],
    },
    {
      heading: "Entrega de guías digitales",
      body: [
        "Todas las guías, paletas de color y recomendaciones se entregan en formato digital como parte estándar del servicio, dentro del plazo indicado para cada paquete.",
      ],
    },
    {
      heading: "Revista Personalizada (versión impresa)",
      body: [
        "La versión impresa de la guía, denominada Revista Personalizada, es un servicio adicional disponible únicamente al finalizar la totalidad del proceso de asesoría, con un valor de $20 USD, salvo en el Paquete Imagen Empresarial, que la incluye sin costo adicional.",
        "Para clientes ubicados fuera de Costa Rica, la impresión y el envío de la Revista Personalizada tienen un costo adicional de envío internacional, que varía según el país de destino. Este costo debe ser consultado y confirmado con Carolina Salazar antes de realizar el pago de la impresión. Piel Pantera Collections no es responsable por retrasos, aranceles de importación o costos aduaneros aplicados por las autoridades del país de destino.",
      ],
    },
    {
      heading: "Cancelaciones y reprogramaciones",
      body: [
        "El/la cliente puede reprogramar su sesión con al menos 24 horas de anticipación, sujeto a disponibilidad de agenda. Las reprogramaciones solicitadas con menos de 24 horas de anticipación, o las inasistencias sin previo aviso, no dan derecho a reembolso ni a una nueva sesión sin costo. Al ser un servicio personalizado que implica preparación y tiempo dedicado exclusivamente al cliente, no se realizan reembolsos una vez iniciado el proceso de asesoría.",
      ],
    },
    {
      heading: "Responsabilidades del cliente",
      body: [
        "El/la cliente se compromete a proporcionar información veraz durante la entrevista inicial y la encuesta previa, así como fotografías propias, actuales y tomadas en luz natural, cuando el servicio lo requiera (por ejemplo, en el Análisis de Colorimetría). La calidad del diagnóstico depende directamente de la calidad y veracidad de la información y el material fotográfico compartido.",
      ],
    },
    {
      heading: "Resultados",
      body: [
        "Las recomendaciones brindadas son de carácter profesional y personalizado, basadas en la experiencia y certificación de Carolina Salazar. Los resultados en materia de percepción, confianza o impacto profesional pueden variar según cada persona, contexto y aplicación de las recomendaciones, y no se garantizan resultados específicos.",
      ],
    },
    {
      heading: "Propiedad intelectual",
      body: [
        "Todo el material entregado (guías, paletas, Revista Personalizada, documentos) es para uso personal del cliente. Queda prohibida su reproducción, reventa o distribución total o parcial sin autorización expresa y por escrito de Carolina Salazar / Piel Pantera Collections.",
      ],
    },
    {
      heading: "Legislación aplicable y jurisdicción",
      body: [
        "Estos Términos y Condiciones se rigen por las leyes de la República de Costa Rica. Para clientes ubicados en otros países de Latinoamérica y Centroamérica, la prestación del servicio se realiza bajo esta misma legislación costarricense, independientemente del país de residencia del cliente, quien acepta expresamente esta jurisdicción al contratar el servicio. Cualquier controversia derivada de la prestación del servicio será resuelta ante los tribunales competentes de Costa Rica, sin perjuicio de los derechos irrenunciables que la legislación de protección al consumidor de cada país pudiera reconocer al cliente.",
      ],
    },
    {
      heading: "Modificaciones",
      body: [
        "Piel Pantera Collections se reserva el derecho de actualizar estos Términos y Condiciones en cualquier momento. Los cambios se publican en esta misma página y son aplicables a las reservas realizadas con posterioridad a su publicación.",
      ],
    },
    {
      heading: "Contacto",
      body: [
        `Para consultas relacionadas con estos Términos y Condiciones, podés escribirnos por WhatsApp o al correo de contacto oficial de Piel Pantera Collections (${CONTACT_EMAIL}).`,
      ],
    },
  ],
};

export const privacidad: LegalDoc = {
  slug: "privacidad",
  title: "Política de Privacidad",
  metaTitle: "Política de Privacidad",
  metaDescription:
    "Cómo Carolina Salazar — Piel Pantera Collections recopila, utiliza, protege y conserva los datos personales y las fotografías compartidas durante la asesoría de imagen online.",
  intro:
    "Cómo recopilamos, usamos y protegemos tu información personal cuando consultás o contratás nuestros servicios.",
  sections: [
    {
      heading: "Responsable del tratamiento",
      body: [
        "Carolina Salazar, bajo la marca Piel Pantera Collections, con sede en Costa Rica, es la responsable del tratamiento de los datos personales recopilados a través de carolinaimagen.com y los canales de contacto asociados (WhatsApp, correo electrónico, formularios de agenda).",
      ],
    },
    {
      heading: "Datos que recopilamos",
      body: [
        "Según el servicio contratado, podemos recopilar: nombre completo, correo electrónico, número de teléfono/WhatsApp, país y ciudad de residencia, respuestas a la encuesta previa a la entrevista inicial, fotografías compartidas para el análisis de colorimetría, morfología o estilo, e información de pago procesada a través de plataformas externas de cobro.",
      ],
    },
    {
      heading: "Finalidad del tratamiento",
      body: [
        "Los datos se utilizan exclusivamente para agendar y coordinar las sesiones; realizar el diagnóstico y las recomendaciones de imagen contratadas; elaborar y entregar las guías digitales y, en su caso, la Revista Personalizada; dar seguimiento durante el proceso de asesoría; y comunicarnos con el cliente por WhatsApp o correo electrónico sobre su servicio.",
      ],
    },
    {
      heading: "Confidencialidad",
      body: [
        "Toda la información personal, fotografías y detalles compartidos durante el proceso de asesoría son estrictamente confidenciales. No se comparten, publican ni utilizan con fines distintos a los del servicio contratado, salvo autorización expresa del cliente (por ejemplo, para testimonios o casos de éxito, que se publican únicamente con consentimiento previo).",
      ],
    },
    {
      heading: "Herramientas y terceros involucrados",
      body: [
        "Para prestar el servicio utilizamos herramientas de terceros como Zoom, Google Meet, Google Drive, Canva y WhatsApp Business, así como plataformas de procesamiento de pago. Además, utilizamos Google Analytics y Meta Pixel para entender cómo se usa nuestro sitio web y medir el desempeño de nuestras campañas — el detalle de esta última categoría se explica en nuestra Política de Cookies. Estas herramientas cuentan con sus propias políticas de privacidad y seguridad. Piel Pantera Collections únicamente comparte con estos proveedores la información estrictamente necesaria para prestar el servicio.",
      ],
    },
    {
      heading: "Conservación de los datos",
      body: [
        "Los datos personales y las fotografías se conservan únicamente durante el tiempo necesario para prestar el servicio y dar seguimiento post-asesoría, y se eliminan de forma segura una vez transcurrido ese período, salvo que la ley exija un plazo de conservación mayor (por ejemplo, para efectos contables o fiscales).",
      ],
    },
    {
      heading: "Derechos del cliente",
      body: [
        `De acuerdo con la Ley N.º 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales de Costa Rica, y en la medida en que resulten aplicables las normas de protección de datos del país de residencia del cliente en Latinoamérica y Centroamérica, el cliente tiene derecho a acceder a sus datos personales, solicitar su rectificación o actualización, solicitar la eliminación de sus datos y fotografías una vez finalizado el servicio, y oponerse al uso de su información para fines distintos a los aquí descritos. Estas solicitudes pueden realizarse escribiendo directamente a Carolina Salazar por WhatsApp o correo electrónico ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: "Clientes fuera de Costa Rica",
      body: [
        "Al ser un servicio 100% online prestado desde Costa Rica hacia clientes de toda Latinoamérica y Centroamérica, el tratamiento de los datos personales se rige principalmente por la legislación costarricense. El cliente acepta esta condición al contratar el servicio, sin perjuicio de los derechos mínimos de protección de datos que la legislación de su país de residencia pudiera reconocerle.",
      ],
    },
    {
      heading: "Menores de edad",
      body: [
        "Los servicios de asesoría de imagen no están dirigidos a personas menores de edad. No recopilamos intencionalmente datos personales de menores de 18 años.",
      ],
    },
    {
      heading: "Cookies",
      body: [
        "El uso de cookies y tecnologías similares en este sitio web se detalla en nuestra Política de Cookies, disponible en una página independiente.",
      ],
    },
    {
      heading: "Cambios en esta política",
      body: [
        "Esta Política de Privacidad puede actualizarse periódicamente. Cualquier cambio será publicado en esta misma página.",
      ],
    },
    {
      heading: "Contacto",
      body: [
        `Para ejercer tus derechos o realizar cualquier consulta sobre el tratamiento de tus datos personales, podés escribirnos por WhatsApp o al correo de contacto oficial de Piel Pantera Collections: ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const cookies: LegalDoc = {
  slug: "cookies",
  title: "Política de Cookies",
  metaTitle: "Política de Cookies",
  metaDescription:
    "Qué cookies utiliza carolinaimagen.com (Google Analytics y Meta Pixel), qué información recopilan y cómo podés gestionarlas o desactivarlas desde tu navegador.",
  intro:
    "Qué cookies utiliza carolinaimagen.com, para qué sirven y cómo podés gestionarlas.",
  sections: [
    {
      heading: "¿Qué son las cookies?",
      body: [
        "Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo (computadora, celular o tablet) cuando lo visitás. Sirven para recordar tus preferencias, entender cómo usás el sitio y, en algunos casos, mostrarte contenido o anuncios más relevantes.",
      ],
    },
    {
      heading: "Cookies que utilizamos",
      items: [
        {
          term: "Cookies esenciales / técnicas",
          desc: "Necesarias para que el sitio funcione correctamente (por ejemplo, para cargar las páginas y mantener la navegación estable). No pueden desactivarse porque son indispensables para el funcionamiento del sitio.",
        },
        {
          term: "Cookies de análisis — Google Analytics",
          desc: "Utilizamos Google Analytics para entender cómo las personas usan carolinaimagen.com: qué páginas visitan, cuánto tiempo permanecen, desde qué dispositivo o ubicación general acceden, y qué contenido genera más interés. Esta información nos ayuda a mejorar el sitio y a decidir qué contenido priorizar. Google procesa estos datos según su propia política de privacidad.",
        },
        {
          term: "Cookies publicitarias de terceros — Meta Pixel",
          desc: "Utilizamos el Meta Pixel (Facebook / Instagram) para medir la efectividad de nuestras publicaciones y campañas, entender qué contenido resulta relevante para quienes visitan el sitio, y mostrar anuncios personalizados de Piel Pantera Collections en Facebook e Instagram a personas con intereses similares a quienes ya visitaron carolinaimagen.com. Meta procesa esta información según su propia política de privacidad, disponible en el sitio de Meta.",
        },
      ],
    },
    {
      heading: "¿Qué información recopilan estas herramientas?",
      body: [
        "Google Analytics puede registrar información como las páginas que visitás, el tiempo de permanencia, el tipo de dispositivo y navegador, y la ubicación geográfica aproximada (a nivel de país o ciudad), sin identificarte personalmente por nombre.",
        "El Meta Pixel puede registrar información como las páginas que visitás dentro de este sitio, las acciones que realizás (por ejemplo, hacer clic en un botón de WhatsApp o completar un formulario), y datos técnicos del dispositivo y navegador. Esta información se asocia a tu cuenta de Meta si tenés una activa, conforme a las políticas de esa plataforma.",
      ],
    },
    {
      heading: "Cómo gestionar o desactivar las cookies",
      body: [
        "Podés administrar o bloquear las cookies directamente desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge, etc.), donde es posible eliminar las cookies existentes y bloquear las futuras. Si querés excluirte específicamente de Google Analytics, podés instalar el complemento oficial de inhabilitación para navegadores que ofrece Google. Si querés dejar de ver anuncios personalizados de Meta basados en tu actividad en distintos sitios web, podés ajustar tus preferencias de anuncios directamente desde la configuración de tu cuenta de Facebook o Instagram.",
        "Tené en cuenta que desactivar las cookies esenciales puede afectar el funcionamiento correcto del sitio.",
      ],
    },
    {
      heading: "Consentimiento",
      body: [
        "Al continuar navegando en carolinaimagen.com, aceptás el uso de cookies conforme a lo descrito en esta política. Si no estás de acuerdo, te recomendamos ajustar la configuración de tu navegador o de tu cuenta de Meta antes de continuar.",
      ],
    },
    {
      heading: "Cambios en esta política",
      body: [
        "Esta Política de Cookies puede actualizarse cuando incorporemos nuevas herramientas de análisis o publicidad. Cualquier cambio será publicado en esta misma página.",
      ],
    },
    {
      heading: "Contacto",
      body: [
        `Para consultas sobre el uso de cookies en este sitio, podés escribirnos por WhatsApp o al correo de contacto oficial de Piel Pantera Collections: ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

/** Las tres páginas legales, en el orden en que se listan en el footer. */
export const legalDocs: LegalDoc[] = [privacidad, terminos, cookies];
