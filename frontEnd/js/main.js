// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.galerie-grid')) {
        chargerGalerie();
        initFiltrage();
    }
    
    if (document.getElementById('contact-form')) {
        initFormulaireContact();
    }
});

async function chargerGalerie() {
    const grid = document.querySelector('.galerie-grid');
    
    try {
        const response = await fetch(`${CONFIG.API_URL}/oeuvres`);
        const oeuvres = await response.json();

        grid.innerHTML = ''; // On vide les cartes statiques

        oeuvres.forEach(o => {
            grid.innerHTML += `
                <div class="carte" data-categorie="${o.categorie.toLowerCase()}">
                    <img src="${CONFIG.STORAGE_URL}${o.image}" alt="${o.titre}">
                    <div class="carte-body">
                        <div class="carte-header">
                            <span class="carte-titre">${o.titre}</span>
                            <span class="badge">${o.categorie}</span>
                        </div>
                        <div class="carte-artiste">${o.artiste ? o.artiste.nom : 'Anonyme'}</div>
                        <p class="carte-desc">${o.description || ''}</p>
                        <div class="carte-footer">
                            <span class="carte-annee">2026</span>
                            <span class="carte-prix">${o.prix} DT</span>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (e) {
        console.error("Erreur chargement galerie", e);
    }
}

function initFormulaireContact() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${CONFIG.API_URL}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Message envoyé !");
            form.reset();
        }
    });
}