// 1. Busquem el botó per la seva ID
const botoInstall = document.getElementById('bt-install');
let eventInstalacio;

// 2. Escoltador per a Android (Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Aturem que surti automàticament
    eventInstalacio = e; // Guardem l'esdeveniment
    botoInstall.style.display = 'block'; // ARA mostrem el botó
});

// 3. Què passa quan cliquem el botó?
botoInstall.addEventListener('click', () => {
    if (eventInstalacio) {
        eventInstalacio.prompt(); // Mostra el cartell de "Vols afegir a la pantalla d'inici?"
        eventInstalacio.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('L\'usuari ha instal·lat l\'app');
            }
            eventInstalacio = null;
        });
    } else {
        // Si no és Android, potser és iOS (Safari)
        alert("A l'iPhone: Clica 'Compartir' i després 'Afegeix a la pantalla d'inici'");
    }
});