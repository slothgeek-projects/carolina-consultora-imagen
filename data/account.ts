'use server'

export async function fetchAccount(slug?: string) {


    const params = new URLSearchParams({
        'filters[slug][$eq]': slug || 'agenda',
        'populate[logo][fields][0]': 'url',
        'populate[whatsapp_sender][fields][0]': 'sender',
    });

    const url = new URL(`/api/accounts?${params.toString()}`, process.env.STRAPI_BASE_URL);

    try {
        const start = Date.now();
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });

        console.log(`Backend responded in ${Date.now() - start}ms`);

        if (!response.ok) {
            console.error("Fetch error:", response.status, response.statusText);
            const errorResponse = await response.json();
            console.error("Error details:", errorResponse);
            return;
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Account Information Service Error:", error);
    }

}

export async function fetchAccountById(documentId?: string) {


    const params = new URLSearchParams({
        'populate[logo][fields][0]': 'url',
        'populate[whatsapp_sender][fields][0]': 'sender',
    });

    const url = new URL(`/api/accounts/${documentId}?${params.toString()}`, process.env.STRAPI_BASE_URL);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });

        if (!response.ok) {
            console.error("Fetch error:", response.status, response.statusText);
            const errorResponse = await response.json();
            console.error("Error details:", errorResponse);
            return;
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Account Information Service Error:", error);
    }

}

export async function fetchAccountOrderServices(id?: string) {

    const params = new URLSearchParams(
        {
            "fields": "documentId",
            "populate[branches][fields]": "*",
            "populate[branches][populate][services][fields]": "*",
            "populate[branches][populate][services][populate][serviceVariation]": "*",
            "populate[branches][populate][services][populate][professionals][fields]": "*",
            "populate[branches][populate][services][populate][professionals][populate][avatar][fields]": "url",
        }
    );

    const url = new URL(`/api/accounts/${id}?${params.toString()}`, process.env.STRAPI_BASE_URL);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log("fetchAccountOrderServices Error details:", errorResponse);
            return;
        }

        const data = await response.json();

        return data.data;

    } catch (error) {
        console.error("Account Information Service Error:", error);
    }

}

export async function fetchAccountOrderProfessional(id?: string) {

    const params = new URLSearchParams(
        {
            "fields": "documentId",
            "populate[branches][fields]": "*",
            "populate[branches][populate][professionals][fields]": "*",
            "populate[branches][populate][professionals][populate][avatar][fields]": "url",
            "populate[branches][populate][professionals][populate][services][fields]": "*",
            "populate[branches][populate][professionals][populate][services][populate][serviceVariation]": "*",
        }
    );

    const url = new URL(`/api/accounts/${id}?${params.toString()}`, process.env.STRAPI_BASE_URL);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log("fetchAccountOrderProfessional Error details:", errorResponse);
            return;
        }

        const data = await response.json();

        return data.data;

    } catch (error) {
        console.error("Account Information Service Error:", error);
    }

}

export async function fetchAccountMetadata(slug?: string) {


    const params = new URLSearchParams({
        'filters[slug][$eq]': slug || 'agenda',
        'fields[0]': 'name',
        'fields[1]': 'sector',
        'fields[2]': 'businessType',
        'fields[3]': 'slug',
        'fields[4]': 'theme',
        'populate[logo][fields][0]': 'url',
        'populate[whatsapp_sender][fields][0]': 'sender',
    });

    const url = new URL(`/api/accounts?${params.toString()}`, process.env.STRAPI_BASE_URL);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            console.error("Fetch error:", response.status, response.statusText);
            const errorResponse = await response.json();
            console.error("Error details:", errorResponse);
            return;
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Account Information Service Error:", error);
    }

}