// ===== FILTRES GALERIE =====
const boutons = document.querySelectorAll('.filtre-btn');
const galerieGrid = document.querySelector('.galerie-grid');

// Charger les oeuvres depuis l'API
async function chargerOeuvres(categorie = 'tout') {
    try {
        let url = 'http://127.0.0.1:8000/api/oeuvres';
        if (categorie !== 'tout') {
            url += '?categorie=' + categorie;
        }

        const response = await fetch(url);
        const oeuvres = await response.json();

        afficherOeuvres(oeuvres);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Afficher les oeuvres dans la galerie
function afficherOeuvres(oeuvres) {
    if (!galerieGrid) return;

    galerieGrid.innerHTML = '';

    oeuvres.forEach(oeuvre => {
        const carte = `
            <div class="carte" data-categorie="${oeuvre.categorie}">
                <img src="${oeuvre.image || 'https://placehold.co/351x351'}" alt="${oeuvre.titre}">
                <div class="carte-body">
                    <div class="carte-header">
                        <span class="carte-titre">${oeuvre.titre}</span>
                        <span class="badge">${oeuvre.categorie}</span>
                    </div>
                    <div class="carte-artiste">${oeuvre.artiste ? oeuvre.artiste.nom : ''}</div>
                    <p class="carte-desc">${oeuvre.description || ''}</p>
                    <div class="carte-footer">
                        <span class="carte-annee">${oeuvre.annee}</span>
                        <span class="carte-prix">${oeuvre.prix} €</span>
                    </div>
                </div>
            </div>
        `;
        galerieGrid.innerHTML += carte;
    });
}

// Filtres
if (boutons) {
    boutons.forEach(bouton => {
        bouton.addEventListener('click', () => {
            boutons.forEach(b => b.classList.remove('active'));
            bouton.classList.add('active');
            const filtre = bouton.dataset.filtre;
            chargerOeuvres(filtre);
        });
    });
}

// Charger les oeuvres au démarrage
chargerOeuvres();

// ===== FORMULAIRE CONTACT =====
const formulaire = document.querySelector('.contact-form');

if (formulaire) {
    formulaire.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            nom: formulaire.querySelector('input[type="text"]').value,
            email: formulaire.querySelector('input[type="email"]').value,
            type_collaboration: formulaire.querySelector('select').value,
            sujet: formulaire.querySelectorAll('input[type="text"]')[1].value,
            message: formulaire.querySelector('textarea').value,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Message envoyé avec succès ! ✅');
                formulaire.reset();
            } else {
                alert('Erreur lors de l\'envoi ❌');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    });
}