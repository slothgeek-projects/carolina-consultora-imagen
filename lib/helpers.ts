
export const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
};

export const parsePrice = (value: number, currency:string, decimals: number = 2) => {
    if(!currency) {
        currency = 'USD';
    }

    if(!value || value == 0){
        return '';
    }
    return value.toLocaleString('en-US', { style: 'currency', currency: currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function getSectorDescription(sector: string): string {
    const map: Record<string, string> = {
        barberia: 'Cortes de cabello, afeitado y servicios de barbería profesional.',
        barber: 'Cortes de cabello, afeitado y servicios de barbería profesional.',
        salon: 'Servicios de belleza, peinado y tratamientos capilares.',
        belleza: 'Servicios de belleza, peinado y tratamientos capilares.',
        estetica: 'Tratamientos estéticos, faciales y de bienestar.',
        spa: 'Tratamientos de spa, relajación y bienestar.',
        nail: 'Servicios de manicure, pedicure y nail art.',
        unas: 'Servicios de manicure, pedicure y nail art.',
    }
    return map[sector?.toLowerCase()] ?? 'Servicios profesionales disponibles para ti.'
}

export function getSchemaType(sector: string): string {
    const map: Record<string, string> = {
        barberia: 'Barbershop',
        barber: 'Barbershop',
        salon: 'BeautySalon',
        belleza: 'BeautySalon',
        estetica: 'BeautySalon',
        spa: 'DaySpa',
        nail: 'BeautySalon',
        unas: 'BeautySalon',
    }
    return map[sector?.toLowerCase()] ?? 'LocalBusiness'
}

export const countryCodes = [
    {
        name: 'Argentina',
        value: '+54',
        code: 'AR',
        icon: '🇦🇷'
    },
    {
        name: 'Bolivia',
        value: '+591',
        code: 'BO',
        icon: '🇧🇴'
    },
    {
        name: 'Brasil',
        value: '+55',
        code: 'BR',
        icon: '🇧🇷'
    },
    {
        name: 'Canadá',
        value: '+1',
        code: 'CA',
        icon: '🇨🇦'
    },
    {
        name: 'Chile',
        value: '+56',
        code: 'CL',
        icon: '🇨🇱'
    },
    {
        name: 'Colombia',
        value: '+57',
        code: 'CO',
        icon: '🇨🇴'
    },
    {
        name: 'Costa Rica',
        value: '+506',
        code: 'CR',
        icon: '🇨🇷'
    },
    {
        name: 'Cuba',
        value: '+53',
        code: 'CU',
        icon: '🇨🇺'
    },
    {
        name: 'Ecuador',
        value: '+593',
        code: 'EC',
        icon: '🇪🇨'
    },
    {
        name: 'El Salvador',
        value: '+503',
        code: 'SV',
        icon: '🇸🇻'
    },
    {
        name: 'Estados Unidos',
        value: '+1',
        code: 'US',
        icon: '🇺🇸'
    },
    {
        name: 'Guatemala',
        value: '+502',
        code: 'GT',
        icon: '🇬🇹'
    },
    {
        name: 'Honduras',
        value: '+504',
        code: 'HN',
        icon: '🇭🇳'
    },
    {
        name: 'México',
        value: '+52',
        code: 'MX',
        icon: '🇲🇽'
    },
    {
        name: 'Nicaragua',
        value: '+505',
        code: 'NI',
        icon: '🇳🇮'
    },
    {
        name: 'Panamá',
        value: '+507',
        code: 'PA',
        icon: '🇵🇦'
    },
    {
        name: 'Paraguay',
        value: '+595',
        code: 'PY',
        icon: '🇵🇾'
    },
    {
        name: 'Perú',
        value: '+51',
        code: 'PE',
        icon: '🇵🇪'
    },
    {
        name: 'República Dominicana',
        value: '+1',
        code: 'DO',
        icon: '🇩🇴'
    },
    {
        name: 'Uruguay',
        value: '+598',
        code: 'UY',
        icon: '🇺🇾'
    },
    {
        name: 'Venezuela',
        value: '+58',
        code: 'VE',
        icon: '🇻🇪'
    }
]