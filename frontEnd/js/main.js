document.addEventListener('DOMContentLoaded', () => {
    // Si on est sur la page galerie, on charge les œuvres
    if (document.querySelector('.galerie-grid')) {
        chargerGalerie();
    }
    
    // Si on est sur la page contact, on initialise le formulaire
    if (document.getElementById('contact-form')) {
        initFormulaireContact();
    }
});

async function chargerGalerie() {
    const grid = document.querySelector('.galerie-grid');
    
    try {
        // 1. Appel à l'API Laravel
        const response = await fetch(`${CONFIG.API_URL}/oeuvres`);
        const oeuvres = await response.json();

        // 2. On vide le contenu actuel (le loader ou les exemples)
        grid.innerHTML = ''; 

        // 3. Boucle pour créer chaque carte d'œuvre
        oeuvres.forEach(o => {
            // On construit l'URL complète de l'image
            const imageFullUrl = `${CONFIG.STORAGE_URL}${o.image}`;

            grid.innerHTML += `
                <div class="carte" data-categorie="${o.categorie.toLowerCase()}">
                    <img src="${imageFullUrl}" alt="${o.titre}" onerror="this.src='https://placehold.co/351x351?text=Image+Introuvable'">
                    <div class="carte-body">
                        <div class="carte-header">
                            <span class="carte-titre">${o.titre}</span>
                            <span class="badge">${o.categorie}</span>
                        </div>
                        <div class="carte-artiste">${o.artiste ? o.artiste.nom : 'Artiste Étudiant'}</div>
                        <p class="carte-desc">${o.description || 'Aucune description disponible.'}</p>
                        <div class="carte-footer">
                            <span class="carte-annee">${o.annee}</span>
                            <span class="carte-prix">${o.prix} DT</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // 4. On active les filtres une fois que le HTML est généré
        activerEcouteursFiltres();

    } catch (e) {
        console.error("Erreur chargement galerie :", e);
        grid.innerHTML = '<p style="color:red; text-align:center;">Impossible de charger les œuvres. Vérifiez que votre backend Laravel est lancé (php artisan serve).</p>';
    }
}

function activerEcouteursFiltres() {
    const boutons = document.querySelectorAll('.filtre-btn');
    
    boutons.forEach(bouton => {
        bouton.addEventListener('click', () => {
            // Gérer l'état actif des boutons
            boutons.forEach(b => b.classList.remove('active'));
            bouton.classList.add('active');

            const filtre = bouton.dataset.filtre;
            const cartes = document.querySelectorAll('.carte');

            // Filtrage visuel
            cartes.forEach(carte => {
                if (filtre === 'tout' || carte.dataset.categorie === filtre) {
                    carte.style.display = 'block';
                } else {
                    carte.style.display = 'none';
                }
            });
        });
    });
}

function initFormulaireContact() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${CONFIG.API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Votre message a bien été envoyé !");
                form.reset();
            }
        } catch (error) {
            console.error("Erreur contact :", error);
            alert("Erreur lors de l'envoi du message.");
        }
    });
}