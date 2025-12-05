const BASE_URL = 'https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com';
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');
const errorOverlay = document.getElementById('error-overlay');
const retryBtn = document.getElementById('retry-btn');
const overlayContent = document.querySelector('.overlay-content');

// UI-referenser i overlay
const ui = {
    name: document.getElementById('modal-name'),
    latin: document.getElementById('modal-latin'),
    desc: document.getElementById('modal-desc'),
    circumference: document.getElementById('modal-circumference'),
    distance: document.getElementById('modal-distance'),
    tempDay: document.getElementById('modal-temp-day'),
    tempNight: document.getElementById('modal-temp-night'),
    moons: document.getElementById('modal-moons')
};

// Hämta API-nyckel
async function getKey() {
    try {
        const res = await fetch(`${BASE_URL}/key`);
        const data = await res.json();
        return data.key;
    } catch (error) {
        console.error("Kunde inte hämta nyckel:", error);
    }
}

// Hämta all data
async function getBodies(key) {
    const resp = await fetch(`${BASE_URL}/bodies?errorcode=true`, {
        headers: {'x-zocom': key}
    });

    if (!resp.ok) {
        throw new Error(`API error! status: ${resp.status}`);
    }

    const data = await resp.json();
    return data.bodies;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Uppdatera och visa overlay
function showOverlay(planetData) {
    ui.name.textContent = planetData.name;
    ui.latin.textContent = planetData.latinName;
    ui.desc.textContent = planetData.desc;

    ui.circumference.textContent = `${formatNumber(planetData.circumference)} km`;
    ui.distance.textContent = `${formatNumber(planetData.distance)} km`;

    ui.tempDay.textContent = `${planetData.temp.day} °C`;
    ui.tempNight.textContent = `${planetData.temp.night} °C`;

    if (planetData.moons && planetData.moons.length > 0) {
        ui.moons.textContent = planetData.moons.join(', ');
    } else {
        ui.moons.textContent = "Inga kända månar";
    }

    overlay.classList.remove('hidden');
}

// Eventlisteners
overlay.addEventListener('click', (e) => {
    if (!overlayContent.contains(e.target)) {
        overlay.classList.add('hidden');
    }
});

// Knapp för att ladda om sidan vid fel
retryBtn.addEventListener('click', () => {
    location.reload();
});

// Stäng overlay
closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
});


// Initiera applikationen
async function init() {
    try {
    const key = await getKey();
    const bodies = await getBodies(key);

    if (!bodies) return;

    bodies.forEach(planetData => {
        const planetElement = document.getElementById(planetData.name);

        if (planetElement) {
            planetElement.addEventListener('click', () => {
                showOverlay(planetData);
            });
        }
    });
    } catch (error) {
        console.error("Ett fel uppstod:", error);
        errorOverlay.classList.remove('hidden');
    }
}

init();