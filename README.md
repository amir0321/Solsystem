# Solaris - Solsystemet

Detta projekt är en webbplats som visualiserar solsystemet. Den hämtar data om planeterna från ett externt API och ritar upp dem på skärmen. Klickar man på en planet får man upp mer information om den.

## Hur det fungerar

Sidan är byggd med standard HTML, CSS och JavaScript (Vanilla). Inga ramverk eller bibliotek används.

### Funktionalitet
1. **API:** Hämtar först en API-nyckel och därefter all data om himlakropparna.
2. **Rendering:** Skapar HTML-element för varje planet baserat på datan och stilar dem (färg/storlek) via JavaScript.
3. **Sök/Info:** När man klickar på en planet öppnas en overlay med detaljer som temperatur, avstånd och månar.

## Installation

Du behöver inte installera något speciellt eftersom det bara är statiska filer.

1. Ladda ner filerna.
2. Öppna `index.html` i din webbläsare (eller använd Live Server i VS Code).

## Filer

* `index.html` - Grundstrukturen.
* `style.css` - Design och layout.
* `script.js` - All logik för att hämta data och hantera klick.
* `service.js` - API-anrop och datahantering.