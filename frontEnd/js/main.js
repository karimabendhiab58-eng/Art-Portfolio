document.addEventListener('DOMContentLoaded', () => {
    // 1. Si on est sur la page galerie, on charge les œuvres
    if (document.querySelector('.galerie-grid')) {
        chargerGalerie();
    }
    
    // 2. Si on est sur la page contact, on initialise le formulaire
    if (document.getElementById('contact-form')) {
        initFormulaireContact();
    }
});

/**
 * CHARGEMENT DE LA GALERIE DYNAMIQUE
 */
async function chargerGalerie() {
    const grid = document.querySelector('.galerie-grid');
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/oeuvres`);
        const oeuvres = await response.json();

        grid.innerHTML = ''; 

        oeuvres.forEach(o => {
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

        // Activer les filtres après la génération du HTML
        activerEcouteursFiltres();

    } catch (e) {
        console.error("Erreur chargement galerie :", e);
        grid.innerHTML = '<p style="color:red; text-align:center;">Impossible de charger les œuvres. Vérifiez que Laravel est lancé.</p>';
    }
}

/**
 * GESTION DES FILTRES (Peinture, Sculpture, etc.)
 */
function activerEcouteursFiltres() {
    const boutons = document.querySelectorAll('.filtre-btn');
    
    boutons.forEach(bouton => {
        bouton.addEventListener('click', () => {
            boutons.forEach(b => b.classList.remove('active'));
            bouton.classList.add('active');

            const filtre = bouton.dataset.filtre;
            const cartes = document.querySelectorAll('.carte');

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

/**
 * GESTION DU FORMULAIRE DE CONTACT
 */
function initFormulaireContact() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${CONFIG.API_URL}/messages`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Succès : Votre message a bien été enregistré !");
                form.reset();
            } else {
                console.error("Erreur Backend:", result);
                alert("Erreur : " + (result.message || "Vérifiez les données saisies."));
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Impossible de contacter le serveur. Vérifiez que php artisan serve est lancé.");
        }
    });
}