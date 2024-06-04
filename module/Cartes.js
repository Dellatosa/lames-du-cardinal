import { handsModule } from "./lames-du-cardinal.js";

export async function AfficherCartes(deck, cards) {
  if (game.user.getFlag(game.system.id, 'card-viewer-active')) {
    const myFancyDealer = await game.modules.get('orcnog-card-viewer').api.CardDealer({
      deckName: deck.name,
      discardPileName: handsModule.defaultDiscardPile
    });
  
    await myFancyDealer.view(cards, false, false, false, false);
  }
  else {
    ui.notifications.error(game.i18n.localize("LdC.notification.cardViewerInactif"));
  }
}

export async function AfficherUneCarte(deckName, cardId) {
  if (game.user.getFlag(game.system.id, 'card-viewer-active')) {
    game.modules.get('orcnog-card-viewer').api.view(deckName, cardId, false, false, true);
  }
  else {
    ui.notifications.error(game.i18n.localize("LdC.notification.cardViewerInactif"));
  }
}

export async function CreerPaquetArcanes() {
  const arcaneHand = game.cards.getName(handsModule.defaultArcaneHand);
}

export async function JouerCarte(hand, destPile, card) {
  const cards = await hand.pass(destPile, [card._id], {action: 'play', chatNotification: false});
}

export async function PiocherMainEscrime(actor, deck, destPile) {
  const nbCards = actor.system.competences.escrime.valeur;
  const cards = await destPile.draw(deck, nbCards, {action: 'draw', chatNotification: false});
}

export async function TestPiocherCartes(actor, type, deck, destPile, competence) {

  const nbCards = type == "eclair" ? 1 : foundry.utils.getProperty(actor.system.competences,`${competence}.valeur`);
  const cards = await destPile.draw(deck, nbCards, {action: 'draw', chatNotification: false});

  await testCompetence(actor, type, competence, cards, deck);
}

export async function testCompetence(actor, type, competence, cards, deck) {

  // Données de la compétence
  const carac = foundry.utils.getProperty(actor.system.competences,`${competence}.carac`);
  let compData = {
    nom: game.i18n.localize(CONFIG.LdC.competences[competence]),
    signe: foundry.utils.getProperty(actor.system.competences,`${competence}.signe`),
    couleur: foundry.utils.getProperty(actor.system.caracteristiques,`${carac}.couleur`),
    valeur : foundry.utils.getProperty(actor.system.competences,`${competence}.valeur`),
    reussiteAuto : foundry.utils.getProperty(actor.system.competences,`${competence}.reussiteAuto`)
  }

  // Données de la ou des cartes piochées
  let drawCardsData;

  if(type == "eclair") {
    // Données de la carte
    let cardData = {
      image: cards[0].faces[0].img,
      nom: cards[0].name,
      signe: cards[0].suit,
      couleur: CONFIG.LdC.couleurSignes[cards[0].suit],
      valeur: cards[0].value,
      id: cards[0]._id,
      deck: deck.name
    }

    drawCardsData = cardData;
  }
  else if(type = "dramatique") {
    let cardsData = [];
    cards.forEach(card => {
      cardsData.push({
        image: card.faces[0].img,
        nom: card.name,
        signe: card.suit,
        couleur: CONFIG.LdC.couleurSignes[card.suit],
        valeur: card.value,
        id: card._id,
        deck: deck.name
      });
    });
    
    drawCardsData = cardsData;
  }

  // Calcul des résultats (Nombre de réussites, réussite critique, échec critique)
  let totalReussites = compData.reussiteAuto;
  let succesPioche = false;
  let piocheArcane = false;
  let reussiteCritique = false;
  let echecCritique = false;

  if(type == "eclair") {
    if(compData.signe == drawCardsData.signe && drawCardsData.valeur > 10) {
      totalReussites += 2;
      succesPioche = true;
    }
    else if(compData.couleur == drawCardsData.couleur) {
      totalReussites += 1;
      succesPioche = true;
    }

    if(drawCardsData.signe == "arcane") {
      piocheArcane = true;
      reussiteCritique = actor.estArcaneBeni(drawCardsData.valeur);
      echecCritique = actor.estArcaneOppose(drawCardsData.valeur);
    }
  }
  else if(type = "dramatique") {
    drawCardsData.forEach(cardData => {
      if(compData.signe == cardData.signe && cardData.valeur > 10) {
        totalReussites += 2;
      }
      else if(compData.couleur == cardData.couleur) {
        totalReussites += 1;
      }

      if(cardData.signe == "arcane") {
        piocheArcane = true;
        reussiteCritique ||= actor.estArcaneBeni(cardData.valeur);
        echecCritique ||= actor.estArcaneOppose(cardData.valeur);
      }
    });
  }

  let resultData = {
    totalReussites: totalReussites,
    succesPioche : succesPioche,
    reussiteCritique: reussiteCritique,
    echecCritique: echecCritique,
    piocheArcane: piocheArcane
  }

  // Recupération du template
  let messageTemplate;
  if(type == "eclair") {
    messageTemplate = "systems/lames-du-cardinal/templates/chat/test-comp-eclair.hbs";
  }
  else if(type = "dramatique") {
    messageTemplate = "systems/lames-du-cardinal/templates/chat/test-comp-dramatique.hbs";
  }
  

  // Assignation des données au template
  let templateContext = {
    cartes : drawCardsData,
    competence : compData,
    resultat: resultData,
    cardViewActive: game?.user?.getFlag(game.system.id, 'card-viewer-active')
  }

  // Construction du message
  let chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    content: await renderTemplate(messageTemplate, templateContext),
    type: CONST.CHAT_MESSAGE_TYPES.ROLL
  }

  // Affichage du message
  ChatMessage.create(chatData);

}

export function testDramatique(actor, competence, cards) {

}
