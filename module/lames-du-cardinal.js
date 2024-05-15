import { LdC } from "./config.js";
import LdCActor from "./LdCActor.js";
import LdCItem from "./LdCItem.js";
import registerHandlebarsHelpers from "./common/helpers.js"
import LdCActorSheet from "./sheets/LdCActorSheet.js";
import LdCItemSheet from "./sheets/LdCItemSheet.js";
import { CardHandsList } from './card-hands/CardHandsList.mjs';

  export const handsModule = {
    id: 'card-hands-list',
    translationPrefix: 'CARDHANDSLIST',
    defaultDiscardPile : "Defausse"
  };

  export async function playCard(hand, destPile, card) {
    const cards = await hand.pass( destPile, [card._id], {action: 'play', chatNotification: false});
    console.log(cards);
  }

  async function preloadHandlebarsTemplates() {
    const templatePaths = [
      "systems/lames-du-cardinal/templates/partials/actors/lame-infos-unlocked.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-caracs-unlocked.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-escrime.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-arcanes.hbs",
      "systems/lames-du-cardinal/templates/partials/actors/lame-ress-contacts-unlocked.hbs"
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

    preloadHandlebarsTemplates();

    registerSystemSettings();

    // Register Handlebars Helpers
	  registerHandlebarsHelpers();
})

  Hooks.on('setup', async function () {

    console.log("Les Lames du Cardinal | Parametrage du module de gestion des mains de cartes")
    // Preload the template and render the UI
    loadTemplates([
      `systems/lames-du-cardinal/templates/card-hands/${handsModule.id}-container.hbs`,
      `systems/lames-du-cardinal/templates/card-hands/hand-list-item.hbs`
    ]);
  
    ui.cardHands = new CardHandsList;
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
  
  function registerSystemSettings() {

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