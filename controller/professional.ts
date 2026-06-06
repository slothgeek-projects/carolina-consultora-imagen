'use server';

export async function fetchProfessionalAvailability(professionalId: string, sessionDuration: number = 60, interval: number = 60) {

    const url = new URL(`/api/professionals/${professionalId}/availability`, process.env.APP_API_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.STRAPI_TOKEN,
        },
        body: JSON.stringify({
            sessionDuration,
            interval,
        }),
    });

    if (response.status !== 200) {
        return {
            data: null,
            error: 'Error al obtener la disponibilidad del profesional',
        };
    }

    const availability = await response.json();

    return availability;
}

export async function fetchServiceAvailability(serviceId: string, branchId: string, serviceDuration:number) {
    const url = new URL(`/api/services/${serviceId}/${branchId}/availability`, process.env.APP_API_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.STRAPI_TOKEN,
        }
    });

    if (response.status !== 200) {
        return {
            data: null,
            error: 'Error al obtener la disponibilidad del profesional',
        };
    }

    const availability = await response.json();

    return availability;
}