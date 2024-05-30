export async function JouerCarte(hand, destPile, card) {
  const cards = await hand.pass(destPile, [card._id], {action: 'play', chatNotification: false});
  console.log(cards);
}

export async function TestPiocherCartes(actor, type, deck, destPile, competence) {
  const nbCards = type == "eclair" ? 1 : foundry.utils.getProperty(this.actor.system.competences,`${competence}.valeur`);
  const cards = await destPile.draw(deck, nbCards, {action: 'draw', chatNotification: false});

  if(type == "eclair") {
    await testEclair(actor, competence, cards, deck);
  }
  else if(type = "dramatique") {
    //testDramatique(actor, competence, cards);
  }
}

export async function testEclair(actor, competence, cards, deck) {

  // Données de la compétence
  const carac = foundry.utils.getProperty(actor.system.competences,`${competence}.carac`);
  let compData = {
    nom: game.i18n.localize(CONFIG.LdC.competences[competence]),
    signe: foundry.utils.getProperty(actor.system.competences,`${competence}.signe`),
    couleur: foundry.utils.getProperty(actor.system.caracteristiques,`${carac}.couleur`),
    valeur : foundry.utils.getProperty(actor.system.competences,`${competence}.valeur`),
    reussiteAuto : foundry.utils.getProperty(actor.system.competences,`${competence}.reussiteAuto`)
  }

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

  // Calcul des résultats (Nombre de réussites, réussite critique, échec critique)
  let nbReussites = compData.reussiteAuto;
  let succesPioche = false;

  if(compData.signe == cardData.signe && cardData.valeur > 10) {
    nbReussites += 2;
    succesPioche = true;
  }
  else if(compData.couleur == cardData.couleur) {
    nbReussites += 1;
    succesPioche = true;
  }

  let piocheArcane = false;
  let reussiteCritique = false;
  let echecCritique = false;

  if(cardData.signe == "arcane") {
    piocheArcane = true;
    reussiteCritique = actor.estArcaneBeni(cardData.valeur);
    echecCritique = actor.estArcaneOppose(cardData.valeur);
  }

  let resultData = {
    nbReussites: nbReussites,
    succesPioche : succesPioche,
    reussiteCritique: reussiteCritique,
    echecCritique: echecCritique,
    piocheArcane: piocheArcane
  }

  // Recupération du template
  const messageTemplate = "systems/lames-du-cardinal/templates/chat/test-comp-eclair.hbs";

  // Assignation des données au template
  let templateContext = {
    carte : cardData,
    competence : compData,
    resultat: resultData
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
