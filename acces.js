window.addEventListener('load', () => {
    const botoInstall = document.getElementById('bt-install');
    let eventInstalacio;

    // 1. Detecció d'iOS (Safari)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        // A l'iPhone el mostrem SI O SI perquè no tenim 'beforeinstallprompt'
        console.log("Detectat iOS: mostrant botó manual.");
        if (botoInstall) {
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "📲 Com instal·lar a l'iPhone";
        }
    }

    // 2. Lògica per a Android (Chrome)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); 
        eventInstalacio = e; 
        if (botoInstall) {
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "📲 Instal·lar App Usuaris Avant";
        }
    });

    // 3. Acció al clicar
    if (botoInstall) {
        botoInstall.addEventListener('click', () => {
            if (eventInstalacio) {
                // Estem a Android
                eventInstalacio.prompt();
            } else if (isIOS) {
                // Estem a l'iPhone: Instruccions visuals
                alert("Per instal·lar l'App al teu iPhone:\n\n1. Clica el botó 'Compartir' (el quadrat amb la fletxa cap amunt).\n2. Tria 'Afegir a la pantalla d'inici'.");
            } else {
                alert("Aquesta opció és per a mòbils. A l'ordinador, pots crear un accés directe des del menú del navegador.");
            }
        });
    }
});
