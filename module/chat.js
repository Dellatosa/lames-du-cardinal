import * as Cartes from "./Cartes.js";

export function addChatListeners(html) {
    html.on('click', 'img.view-card', onAfficherCarte);
}

function onAfficherCarte(event) {
    event.preventDefault();
    const element = event.currentTarget;

    Cartes.AfficherUneCarte(element.dataset.deck, element.dataset.id);
}