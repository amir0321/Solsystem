const BASE_URL = 'https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com';
const solarSystem = document.getElementById('solar-system');
const overlay = document.getElementById('overlay');

/* Färger + storlek */
const planetStyles = {
    Solen : { size: 150, color: "#ffdd00" },
    Merkurius: { size: 14, color: "#888888" },
    Venus: { size: 24, color: "#e7e7e7" },
    Jorden: { size: 26, color: "#428ed4" },
    Mars: { size: 14, color: "#c1440e" },
    Jupiter: { size: 140, color: "#E0AE6F" },
    Saturnus: { size: 110, color: "#DFD3A9", ring: true },
    Uranus: { size: 48, color: "#BECCDF" },
    Neptunus: { size: 48, color: "#5B7FB6" }
};

// API KEY
async function getKey() {
    try {
        const res = await fetch(`${BASE_URL}/key`);
        const data = await res.json();
        return data.key;
    } catch (err) {
        console.error("Failed to load API key", err);
        showError("Kunde inte ladda API-nyckel.");
        throw err;
    }
}

// Get Bodies
async function getBodies(key) {
    try {
        let resp = await fetch('https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies?errorcode=true', {
            method: 'GET',
            headers: {'x-zocom': key}
        });

        if (!resp.ok) {
            throw new Error(`Serverfel: ${resp.status}`);
        }

        let data = await resp.json();
        return data.bodies;

    } catch (error) {
        console.error("Det gick inte att hämta planeterna:", error);

        solarSystem.innerHTML = `
            <section class="error-message" style="color: white; text-align: center; margin-top: 50px;">
                <h2>Hoppsan!</h2>
                <p>Kunde inte hämta himlakropparna just nu.</p>
                <p>Felet var: ${error.message}</p>
                <button onclick="location.reload()">Försök igen</button>
            </section>
        `;

        return [];
    }
}

// Overlay
function openOverlay(planet) {
    overlay.innerHTML = `
        <section class="overlay-content">
            <h1>${planet.name}</h1>
            <h3>${planet.latinName}</h3>
            <p>${planet.desc}</p>
            <br>
            <div class="planet-stats">
                <div>
                    <strong>OMKRETS</strong>
                    <p>${planet.circumference} km</p>
                </div>
                <div>
                    <strong>KM FRÅN SOLEN</strong>
                    <p>${planet.distance} km</p>
                </div>
            </div>
            <div class="planet-stats">
                <div>
                    <strong>MAX TEMP</strong>
                    <p>${planet.temp.day} °C</p>
                </div>
                <div>
                    <strong>MIN TEMP</strong>
                    <p>${planet.temp.night} °C</p>
                </div>
            </div>
            <div class="planet-stats">
                <div>
                    <strong>MÅNAR</strong>
                    <p>${planet.moons.map(m => m).join(', ') || "Inga månar"}</p>
                </div>
            </div>
            <button id="close-btn">Stäng</button>
        </section>
    `;

    document.getElementById("close-btn").onclick = closeOverlay;
    overlay.classList.remove("overlay-hidden");
}

// Close Overlay
function closeOverlay() {
    overlay.classList.add("overlay-hidden");
}

// Rendering Error
function showError(msg) {
    solarSystem.innerHTML = `<p style="color:white;text-align:center">${msg}</p>`;
}

// Render Planets
async function renderPlanets() {
    solarSystem.innerHTML = "";

    try {
        const key = await getKey();
        const bodies = await getBodies(key);

        bodies.forEach(planet => {
            const style = planetStyles[planet.name];
            if (!style) return;

            const el = document.createElement("section");
            el.className = "planet";
            if (planet.name === "Solen") el.id = "sun";

            el.style.width = style.size + "px";
            el.style.height = style.size + "px";
            el.style.backgroundColor = style.color;

            if (style.ring) el.classList.add("with-ring");

            el.addEventListener("click", () => openOverlay(planet));
            solarSystem.appendChild(el);
        });
    } catch (err) {
        console.error("Fel vid renderPlanets:", err);
        showError("Något gick fel vid renderingen av planeter.");
    }
}


window.onload = renderPlanets;