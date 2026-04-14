const boutons = document.querySelectorAll('.filtre-btn');
const cartes = document.querySelectorAll('.carte');

boutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
        boutons.forEach(b => b.classList.remove('active'));
        bouton.classList.add('active');

        const filtre = bouton.dataset.filtre;

        cartes.forEach(carte => {
            if (filtre === 'tout' || carte.dataset.categorie === filtre) {
                carte.style.display = 'block';
            } else {
                carte.style.display = 'none';
            }
        });
    });
});