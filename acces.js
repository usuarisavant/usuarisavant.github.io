document.addEventListener('DOMContentLoaded', () => {
    const botoInstall = document.getElementById('bt-install');
    let eventInstalacio;

    console.log("Script d'accés iniciat. Botó trobat:", !!botoInstall);

    // 1. Detecció d'iOS (Safari)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS && botoInstall) {
        console.log("Detectat iOS: Forçant visibilitat.");
        botoInstall.style.display = 'block';
        botoInstall.innerHTML = "📲 Instal·lar App (iOS)";
    }

    // 2. Lògica per a Android/Brave (Chrome-based)
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log("Esdeveniment beforeinstallprompt detectat!");
        e.preventDefault(); 
        eventInstalacio = e; 
        if (botoInstall) {
            botoInstall.style.display = 'block';
            // No canviem el text aquí si ja és iOS per evitar confusions
            if (!isIOS) botoInstall.innerHTML = "📲 Instal·lar App Usuaris Avant";
        }
    });

    // 3. Acció al clicar
    if (botoInstall) {
        botoInstall.onclick = () => {
            if (eventInstalacio) {
                eventInstalacio.prompt();
                eventInstalacio.userChoice.then((choice) => {
                    if (choice.outcome === 'accepted') console.log('App instal·lada');
                    eventInstalacio = null;
                });
            } else if (isIOS) {
                alert("Per instal·lar a l'iPhone:\n\n1. Clica 'Compartir' (quadrat amb fletxa).\n2. Tria 'Afegir a la pantalla d'inici'.");
            } else {
                alert("Si no surt el cartell d'instal·lar, cerca l'opció 'Instal·lar aplicació' al menú del teu navegador.");
            }
        };
    }
});