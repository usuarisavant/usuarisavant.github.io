// 1. Busquem el botó per la seva ID
const botoInstall = document.getElementById('bt-install');
let eventInstalacio;

// --- DETECCIÓ D'iOS (S'executa en carregar la pàgina) ---
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIOS) {
    // Si és un iPhone, mostrem el botó directament perquè mai rebrà l'esdeveniment d'Android
    botoInstall.style.display = 'block';
    botoInstall.innerHTML = "📲 Instal·lar App (iOS)";
}

// 2. Escoltador per a Android (Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Aturem que surti automàticament
    eventInstalacio = e; // Guardem l'esdeveniment
    botoInstall.style.display = 'block'; // ARA mostrem el botó a Android
});

// 3. Què passa quan cliquem el botó?
botoInstall.addEventListener('click', () => {
    if (eventInstalacio) {
        // CAS ANDROID: Executem el prompt oficial
        eventInstalacio.prompt(); 
        eventInstalacio.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('L\'usuari ha instal·lat l\'app');
            }
            eventInstalacio = null;
        });
    } else if (isIOS) {
        // CAS iOS: Mostrem les instruccions manuals
        alert("Per instal·lar a l'iPhone:\n\n1. Clica el botó 'Compartir' (el quadrat amb la fletxa cap amunt al menú de Safari).\n2. Deslletja cap avall i tria 'Afegir a la pantalla d'inici'.");
    } else {
        // CAS ORDINADOR o ALTRES: Missatge genèric
        alert("Fes servir el menú del teu navegador per afegir aquesta web a l'escriptori.");
    }
});
