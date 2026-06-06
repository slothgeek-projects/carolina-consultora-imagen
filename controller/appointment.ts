'use server';

import { z } from "zod";

// Función utilitaria para eliminar propiedades con valores vacíos
function removeEmptyProperties(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === '') return false;
            if (value === null) return false;
            if (value === undefined) return false;
            return true;
        })
    );
}

const appointmentSchema = z.object({
    professional: z.string().optional(),
    branch: z.string(),
    service: z.string(),
    customerName: z.string().min(1, {message: "El nombre es requerido"}),
    customerPhone: z.string().min(12, {message: "El teléfono debe tener 8 dígitos"}),
    customerEmail: z.string().refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "El email debe tener un formato válido"
    }).optional(),
    timeStart: z.string(),
    timeEnd: z.string(),
    state: z.string().optional().default('pending'),
    note: z.string().optional(),
    serviceVariation: z.string().optional(),
    latitude: z.string().min(1, {message: "La ubicación es requerida"}).optional(),
    longitude: z.string().min(1, {message: "La ubicación es requerida"}).optional(),
});

const APP_API_URL = process.env.APP_API_URL;

export async function createAppointmentAction(prevState:any, formData:FormData){

    const formDataObj = Object.fromEntries(formData);
    
    const validatedFields = appointmentSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
        return {
            ...prevState,
            data: null,
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    //const response = await createAppointment(validatedFields.data);
   
    // Filtrar propiedades con valores vacíos
    const cleanData = removeEmptyProperties(validatedFields.data);
   
    const url = new URL('/api/appointments', APP_API_URL);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.STRAPI_TOKEN,
        },
        body: JSON.stringify(cleanData),
    });

    if (response.status !== 200) {
        return {
            ...prevState,
            data: null,
            error: 'Error al crear la cita',
        };
    }
    
    const appointment = await response.json();

    return {
        ...prevState,
        data: appointment,
    };

}