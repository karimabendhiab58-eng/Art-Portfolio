// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Si on est sur la page galerie
    if (document.querySelector('.galerie-grid')) {
        chargerGalerie();
    }
    
    // Si on est sur la page contact
    if (document.getElementById('contact-form')) {
        initFormulaireContact();
    }
});

async function chargerGalerie() {
    const grid = document.querySelector('.galerie-grid');
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/oeuvres`);
        const oeuvres = await response.json();

        grid.innerHTML = ''; // Vide le loader ou les cartes de test

        // Dans ta fonction chargerGalerie() de main.js, remplace la boucle par celle-ci :
oeuvres.forEach(o => {
    grid.innerHTML += `
        <div class="carte" data-categorie="${o.categorie.toLowerCase()}">
            <img src="${CONFIG.STORAGE_URL}${o.image}" alt="${o.titre}">
            <div class="carte-body">
                <div class="carte-header">
                    <span class="carte-titre">${o.titre}</span>
                    <span class="badge">${o.categorie}</span>
                </div>
                <div class="carte-artiste">${o.artiste ? o.artiste.nom : 'Artiste Étudiant'}</div>
                <p class="carte-desc">${o.description || ''}</p>
                <div class="carte-footer">
                    <span class="carte-annee">${o.annee}</span>
                    <span class="carte-prix">${o.prix} DT</span>
                </div>
            </div>
        </div>
    `;
});

        // TRÈS IMPORTANT : On active les filtres APRES avoir chargé les oeuvres
        activerEcouteursFiltres();

    } catch (e) {
        console.error("Erreur chargement galerie", e);
        grid.innerHTML = '<p>Impossible de charger les œuvres pour le moment.</p>';
    }
}

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
                alert("Votre message a bien été envoyé à l'artiste !");
                form.reset();
            }
        } catch (error) {
            alert("Erreur lors de l'envoi du message.");
        }
    });
}