import { LdC } from "./config.js";
import LdCActor from "./LdCActor.js";
import LdCItem from "./LdCItem.js";
import registerHandlebarsHelpers from "./common/helpers.js"
import LdCActorSheet from "./sheets/LdCActorSheet.js";
import LdCItemSheet from "./sheets/LdCItemSheet.js";
import * as Chat from "./chat.js";
import { CardHandsList } from './card-hands/CardHandsList.mjs';

  export let handsModule = {
    id: 'card-hands-list',
    translationPrefix: 'CARDHANDSLIST',
    defaultDeck : "",
    defaultDeckId: "",
    defaultDiscardPile : "",
    defaultDiscardPileId: "",
    defaultArcaneHand: "Arcanes MJ",
    defaultArcaneHandId: ""
  };

  async function preloadHandlebarsTemplates() {
    const templatePaths = [
      "systems/lames-du-cardinal/templates/partials/actors/lame-infos.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-caracs-unlocked.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-caracs-locked.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-sante.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-escrime.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-arcanes.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-ress-contacts-locked.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-ress-contacts-unlocked.hbs",
      `systems/lames-du-cardinal/templates/card-hands/${handsModule.id}-container.hbs`,
      `systems/lames-du-cardinal/templates/card-hands/hand-list-item.hbs`
    ]

    return loadTemplates(templatePaths);
  };

  Hooks.once("init", function() {
    console.log("Les Lames du Cardinal | Initialisation du système Les Lames du Cardinal, le JDR");

    game.LdC = {
        LdCActor,
        LdCItem
    };

    //CONFIG.debug.hooks = true;

    CONFIG.LdC = LdC;
    CONFIG.Actor.documentClass = LdCActor;
    CONFIG.Item.documentClass = LdCItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet(game.system.id, LdCActorSheet, {makeDefault: true});

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet(game.system.id, LdCItemSheet, {makeDefault: true});

    // Chargement des templates des Handlebars
    preloadHandlebarsTemplates();

    // Enregistrement des Handlebars Helpers personnalisés
	  registerHandlebarsHelpers();
  })

  Hooks.on('setup', async function () {

    // Enregistrement des paramètres
    console.log("Les Lames du Cardinal | Enregistrement des paramètres du système");
    registerSystemSettings();

    console.log("Les Lames du Cardinal | Paramétrage du module de gestion des mains de cartes");
    ui.cardHands = new CardHandsList;
    
    let deckId = game.settings.get(game.system.id,'defaultGameDeck');
    if(deckId) {
      handsModule.defaultDeckId = deckId;
      handsModule.defaultDeck = game.cards.get(deckId).name;
    }
    
    let pileId = game.settings.get(game.system.id,'defaultGamePile');
    if(pileId) {
      handsModule.defaultDiscardPileId = pileId
      handsModule.defaultDiscardPile = game.cards.get(pileId).name;
    }

    const gmMap = new Map();
    gmMap.set("default", 0);
    game?.users?.filter(u => u.isGM === true).forEach(user => {
      gmMap.set(user.id, 3);
    });

    if (!game.cards.some(function (cards) { return cards.type == "hand" && cards.name == "Arcanes"})) {
      const cardsData = {
        name: "Arcanes",  
        type: "hand",
        system: {},
        description: "",
        img: "icons/svg/card-hand.svg",
        cards : {},
        ownership: Object.fromEntries(gmMap),
        flags: {}
      };
      
      //console.log(game.cards.createDocument(cardsData)); 
      //console.log(game.cards);
      
    } 

  });

  Hooks.on('ready', async function () {
    if (game.ready) ui.cardHands.render(true);
  
    // Migrate favorites flag to pinned flag.
    const favoritedHands = game.user.getFlag(game.system.id, 'favorite-hands');
  
    if (favoritedHands?.length) {
      await game.user.setFlag(game.system.id, 'pinned-hands', favoritedHands);
      await game.user.unsetFlag(game.system.id, 'favorite-hands');
    }

    if (game.modules.get('orcnog-card-viewer')?.active) {
      await game.user.setFlag(game.system.id, "card-viewer-active", true);
    }
    else {
      await game.user.setFlag(game.system.id, "card-viewer-active", false);
    }
    
  });
  
  // When the Player List is rendered, render the module UI
  Hooks.on('renderPlayerList', async (data) => {
    if (game.ready) ui.cardHands.render(true);
  });
  
  Hooks.on("renderChatLog", (app, html, data) => Chat.addChatListeners(html));

  function registerSystemSettings() {

    // Deck 'Tarot des Ombres' par défaut
    const deckMap = new Map();
    game?.cards?.filter(c => c.type === 'deck').forEach(deck => {
      deckMap.set(deck.id, deck.name);
    });

    game.settings.register(game.system.id, 'defaultGameDeck', {
      name: `LdC.settings.defaultGameDeck.Name`,
      hint: `LdC.settings.defaultGameDeck.Hint`,
      scope: 'world',
      config: true,
      type: String,
      default: "",
      choices: Object.fromEntries(deckMap),
      onChange: value => {
        handsModule.defaultDeckId = value;
        handsModule.defaultDeck = game.cards.get(value).name;
      }
    });

    // Defausse par défaut
    const pileMap = new Map();
    game?.cards?.filter(c => c.type === 'pile').forEach(pile => {
      pileMap.set(pile.id, pile.name);
    });

    game.settings.register(game.system.id, 'defaultGamePile', {
      name: `LdC.settings.defaultGamePile.Name`,
      hint: `LdC.settings.defaultGamePile.Hint`,
      scope: 'world',
      config: true,
      type: String,
      default: "",
      choices: Object.fromEntries(pileMap),
      onChange: value => {
        handsModule.defaultDiscardPileId = value;
        handsModule.defaultDiscardPile = game.cards.get(value).name;
      }
    });

    /* Module Settings - card-hand-list */
    // Register the ownership level option
    game.settings.register(game.system.id, 'observerLevel', {
        name: `${handsModule.translationPrefix}.ObserverLevel.Name`,
        hint: `${handsModule.translationPrefix}.ObserverLevel.Hint`,
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: () => ui.cardHands.render(true)
    });
    

    if (game.modules.get('minimal-ui')?.active) {
        game.settings.register(game.system.id, 'minimal-ui-behavior', {
        name: `${handsModule.translationPrefix}.MinimalUIBehavior.Name`,
        hint: `${handsModule.translationPrefix}.MinimalUIBehavior.Hint`,
        scope: 'world',
        config: true,
        type: String,
        choices: {
            "always": game.i18n.localize("MinimalUI.SettingsAlwaysVisible"),
            "autohide": game.i18n.localize("MinimalUI.SettingsAutoHide"),
        },
        default: "always",
        requiresReload: true,
        });
    }
  }

  /* Hooks to listen to changes in settings and Card Hands data */
  // Array of Card Hooks
  const cardHandsListCardHooksArray = [
    'createCard',
    'updateCard',
    'deleteCard',
  ];
  
  // Hooks for Card events
  for (const hook of cardHandsListCardHooksArray) {
    Hooks.on(hook, (data) => {
      if (data.parent.type === 'hand') ui.cardHands.render(true);
    });
  }
  
  // Array of Cards (i.e., Stacks) Hooks
  const cardHandsListCardsHooksArray = [
    'createCards',
    'updateCards',
    'deleteCards',
  ];
  
  // Hooks for Card Stack events
  for (const hook of cardHandsListCardsHooksArray) {
    Hooks.on(hook, (data) => {
      if (data.type === 'hand') ui.cardHands.render(true);
    });
  }
  
  // Enrich HTML.
  Handlebars.registerHelper('CardHandsList_enrichHTML', (text) => {
    return TextEditor.enrichHTML(text, {async: false});
  });