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

        console.log(`Les Lames du Cardinal | Chargement du template systems/lames-du-cardinal/templates/sheets/items/${this.item.type.toLowerCase()}-sheet.html`);
        return `systems/lames-du-cardinal/templates/sheets/items/${this.item.type.toLowerCase()}-sheet.html`
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.LdC;

        return data;
    }
}