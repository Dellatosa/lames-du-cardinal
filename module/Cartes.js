export async function TestPiocherCartes(deck, destPile, nbCards) {
    const cards = await deck.deal(destPile, nbCards, {action: 'deal', chatNotification: true});
    console.log(cards);
  }

  export async function JouerCarte(hand, destPile, card) {
    const cards = await hand.pass(destPile, [card._id], {action: 'play', chatNotification: false});
    console.log(cards);
  }

  /*
  _whisperCardInstructions(deckName, cardId, cardName, front, desc) {
        const dm = game.users.find(u => u.isGM && u.active);
        if (!dm) {
            LogUtility.warn(game.i18n.localize(MODULE_L18N_PREFIX + ".notification.gmNotFound")); //"GM user not found."
            return;
        }

        const messageContent = `<div class="card-draw ${MODULE_ID}-msg flexrow" data-deck="${deckName}" data-card="${cardId}">
                <img class="card-face" src="${front}" alt="${cardName}" />
                <h4 class="card-name">${cardName}</h4>
            </div>
            <p>${desc}</p>`;

        ChatMessage.create({ content: messageContent, whisper: [dm._id] });
    }
  */