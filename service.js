export const BASE_URL = 'https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com';

// Hämta API-nyckel
export async function getKey() {
    try {
        const res = await fetch(`${BASE_URL}/key`);
        const data = await res.json();
        return data.key;
    } catch (error) {
        console.error("Kunde inte hämta nyckel:", error);
    }
}

// Hämta all data
export async function getBodies(key) {
    const resp = await fetch(`${BASE_URL}/bodies?errorcode=true`, {
        headers: {'x-zocom': key}
    });

    if (!resp.ok) {
        throw new Error(`API error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data.bodies;
}