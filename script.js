// Hämta API-nyckel
import { getKey, getBodies } from './service.js';

// Overlay-element
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

// Formatera nummer med mellanslag som tusentalsavgränsare
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
        errorOverlay.classList.remove('hidden');
    }
}

init();