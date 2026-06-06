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