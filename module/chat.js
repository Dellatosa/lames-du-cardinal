export function addChatListeners(html) {
    html.on('click', 'img.card-face', onAfficherCarte);
}

function onAfficherCarte(event) {
    event.preventDefault();
    const element = event.currentTarget;

    const deckName = element.dataset.deck;
    const cardId = element.dataset.id;

    game.modules.get('orcnog-card-viewer').api.view(deckName, cardId, false, false, true);
}