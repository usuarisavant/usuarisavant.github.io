document.addEventListener('DOMContentLoaded', () => {
    const botoInstall = document.getElementById('bt-install');
    let eventInstalacio;

    // 1. Detectem el tipus de dispositiu
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isMobile = isIOS || isAndroid;

    console.log("Script iniciat. Dispositiu:", isMobile ? "Mòbil" : "Ordinador");

    // --- LÒGICA DE VISIBILITAT INICIAL ---

    if (botoInstall) {
        if (isIOS) {
            // iOS: el mostrem sempre perquè no hi ha 'beforeinstallprompt'
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "📲 Instal·lar App (iOS)";
        } else if (!isMobile) {
            // ORDINADOR: el mostrem per oferir instal·lació o preferits
            botoInstall.style.display = 'block';
            botoInstall.innerHTML = "⭐ Afegir a Preferits / App";
        }
    }

    // 2. Lògica per a Android/Chrome/Brave (Suport PWA oficial)
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log("PWA detectada! Es pot instal·lar oficialment.");
        e.preventDefault(); 
        eventInstalacio = e; 
        
        if (botoInstall) {
            botoInstall.style.display = 'block';
            // Si l'ordinador suporta PWA (Chrome/Brave), canviem el text
            botoInstall.innerHTML = isMobile ? "📲 Instal·lar App" : "🖥️ Instal·lar com a App";
        }
    });

    // 3. Acció al clicar el botó
    if (botoInstall) {
        botoInstall.onclick = () => {
            if (eventInstalacio) {
                // Cas: Instal·lació oficial (Android o Chrome PC)
                eventInstalacio.prompt();
                eventInstalacio.userChoice.then((choice) => {
                    if (choice.outcome === 'accepted') console.log('App instal·lada');
                    eventInstalacio = null;
                });
            } else if (isIOS) {
                // Cas: iPhone
                alert("Per instal·lar a l'iPhone:\n\n1. Clica el botó 'Compartir' (quadrat amb fletxa).\n2. Tria 'Afegir a la pantalla d'inici'.");
            } else if (!isMobile) {
                // Cas: Ordinador sense suport PWA directe (Firefox/Safari Mac)
                alert("Per guardar aquesta web:\n\n1. Prem 'Ctrl + D' (o 'Cmd + D' a Mac) per afegir-la a Preferits.\n\n2. Si uses Chrome/Brave, busca la icona d'instal·lar a la barra de direccions.");
            } else {
                alert("Cerca l'opció 'Instal·lar aplicació' al menú del teu navegador.");
            }
        };
    }
});
