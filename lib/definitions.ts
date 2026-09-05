export type Account = {
    id: string | number;
    documentId: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    nif: string;
    whatsapp: string;
    web: string;
    startBusiness: string | undefined;
    sector: string;
    logo: {
        id: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
    proffesionals?: Array<Professional>;
    branches?: Array<Branch>;
    services?: Array<Service>;
    theme: 'service' | 'professional' | 'service-without-professional';
    currency: string;
    showPrices?: boolean;
    whatsapp_sender?: {
        id: string;
        documentId: string;
        sender: string;
    }
    timeZone: string;
    appointmentDefaultState?: string;
    timeInterval?: number;
};

export type Branch = {
    id: string | number;
    documentId: string;
    type: 'local' | 'online' | 'domicile';
    name: string;
    state: string;
    city: string;
    address: string;
    country: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    services?: Array<Service>;
    main: boolean;
    whatsapp: string;
    professionals?: Array<Professional>;
    schedules?: Array<Schedule>;
    account?: Account;
    disabled?: boolean;
};

export type Schedule = {
    id: string | number;
    documentId: string;
    day: string;
    timeStart: string;
    timeEnd: string;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    relation?: string;
};

export type Professional = {
    id: string | number;
    documentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: {
        id: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
    account: Account;
    services?: Array<Service>;
    schedules?: Array<Schedule>;
    branches?: Array<Branch>;
    bio: string;
    disabled?: boolean;
};

export type Service = {
    id: string | number;
    documentId: string;
    type: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    durationType: string;
    durationInMinutes: number;
    numberOfSessions: number;
    availability: Availabitity;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    professionals?: Array<Professional>;
    branches?: Array<Branch>;
    account?: Account | string;
    serviceVariation: Array<ServiceVariation>;
    disabled?: boolean;
};

export type ServiceVariation = {
    id: number;
    uid: string;
    name: string;
    description: string;
    price: number;
    duration: number;
}

export type Availabitity = {
    start: string;
    end: string;
    date: string;
};

/* ── Blog (WordPress + ACF) ──────────────────────────────────────────────
   WpRaw* describen la forma cruda de la REST de WordPress; Post y Categoria
   son los tipos que consume el front. La traducción entre ambos vive en
   lib/wp.ts y no debe filtrarse a los componentes. */

export type WpRawRendered = { rendered: string };

export type WpRawMedia = {
    id?: number;
    source_url?: string;
    alt_text?: string;
    media_details?: { width?: number; height?: number };
    /* La REST devuelve un objeto de error en _embedded cuando el adjunto
       ya no existe; se distingue por esta clave. */
    code?: string;
};

export type WpRawTerm = {
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
};

/** Imagen de ACF con acf_format=standard. Si falta el parámetro llega un id. */
export type WpRawAcfImage = {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
};

export type WpRawAcf = {
    extracto?: string;
    tiempo_lectura?: number | string;
    destacado?: boolean;
    seo_title?: string;
    seo_description?: string;
    og_image?: WpRawAcfImage | number | false | null;
    cta_texto?: string;
    cta_enlace?: string;
};

export type WpRawPost = {
    id: number;
    slug: string;
    date_gmt: string;
    modified_gmt: string;
    title: WpRawRendered;
    content: WpRawRendered;
    acf?: WpRawAcf;
    _embedded?: {
        "wp:featuredmedia"?: Array<WpRawMedia>;
        "wp:term"?: Array<Array<WpRawTerm>>;
    };
};

export type Imagen = {
    url: string;
    alt: string;
    width?: number;
    height?: number;
};

export type Categoria = {
    id: number;
    nombre: string;
    slug: string;
};

export type Post = {
    id: number;
    slug: string;
    titulo: string;
    /** HTML del editor, sin sanitizar. Solo articleBody.tsx lo inyecta. */
    contenidoHtml: string;
    extracto: string;
    fecha: string;
    fechaModificada: string;
    tiempoLectura: number | null;
    destacado: boolean;
    imagen: Imagen | null;
    categoria: Categoria | null;
    seoTitulo: string | null;
    seoDescripcion: string | null;
    ogImagen: Imagen | null;
    cta: { texto: string; enlace: string } | null;
};

export type ListadoPosts = {
    posts: Array<Post>;
    totalPages: number;
    total: number;
};
