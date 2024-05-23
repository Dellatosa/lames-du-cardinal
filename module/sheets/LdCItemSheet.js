export default class LdCItemSheet extends ItemSheet {
     
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 650,
            height: 540,
            classes: ["ldc", "sheet", "item"],
            //tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {

        console.log(`Les Lames du Cardinal | Chargement du template systems/${game.system.id}/templates/sheets/items/${this.item.type.toLowerCase()}-sheet.html`);
        return `systems/${game.system.id}/templates/sheets/items/${this.item.type.toLowerCase()}-sheet.html`
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.LdC;

        data.feintes = game.items.filter(function (item) { return item.type == "Feinte"} );
        data.ecoles = game.items.filter(function (item) { return item.type == "Ecole"} );
               
        return data;
    }
}

Hooks.on('closeLdCItemSheet', async (itemSheet) => {

    if(itemSheet.item.type == "Profil") {
        itemSheet.item.updateProfilActiveEffects();
    }

    if(itemSheet.item.type == "Arcane") { 
        itemSheet.item.updateArcaneActiveEffect();
    }
});