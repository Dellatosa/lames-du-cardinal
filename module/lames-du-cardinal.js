import { LdC } from "./config.js";
import LdCActor from "./LdCActor.js";
import LdCItem from "./LdCItem.js";
import registerHandlebarsHelpers from "./common/helpers.js"
import LdCActorSheet from "./sheets/LdCActorSheet.js";
import LdCItemSheet from "./sheets/LdCItemSheet.js";

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
    Actors.registerSheet("lames-du-cardinal", LdCActorSheet, {makeDefault: true});

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lames-du-cardinal", LdCItemSheet, {makeDefault: true});

    //registerSystemSettings();

    // Register Handlebars Helpers
	registerHandlebarsHelpers();
})