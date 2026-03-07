document.addEventListener('DOMContentLoaded', () => {
    const botoInstall = document.getElementById('bt-install');
    let eventInstalacio;

    // 1. Detecció detallada
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMobile = isIOS || isAndroid;

    // --- FORÇAR VISIBILITAT PERQUÈ NO QUEDI BUIT ---
    if (botoInstall) {
        if (isIOS) {
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "📲 Instal·lar App (iOS)";
        } else if (!isMobile) {
            // AQUESTA LÍNIA ÉS LA QUE ARREGLA EL FIREFOX
            // Si és un PC, el mostrem directament amb el text de Preferits
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "⭐ Afegir a Preferits (PC)";
        }
    }

    // 2. Lògica per a Chrome/Brave/Android (Esdeveniment oficial)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); 
        eventInstalacio = e; 
        if (botoInstall) {
            botoInstall.style.display = 'block';
            // Si el navegador de PC realment suporta instal·lació (Chrome), canviem el text
            botoInstall.innerHTML = isMobile ? "📲 Instal·lar App" : "🖥️ Instal·lar com a App";
        }
    });

    // 3. Acció al clicar
    if (botoInstall) {
        botoInstall.onclick = () => {
            if (eventInstalacio) {
                eventInstalacio.prompt();
            } else if (isIOS) {
                alert("A l'iPhone:\n1. Clica 'Compartir' (fletxa cap amunt).\n2. Tria 'Afegir a la pantalla d'inici'.");
            } else if (!isMobile) {
                // MISSATGE ESPECÍFIC PER A FIREFOX / PC
                alert("⭐ Per guardar aquesta web a Firefox:\n\nPrem 'Ctrl + D' al teu teclat per afegir-la als teus Marcadors/Preferits.");
            }
        };
    }
});
