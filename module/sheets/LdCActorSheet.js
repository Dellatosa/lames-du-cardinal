export default class LdCActorSheet extends ActorSheet {
     
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 700,
            height: 900,
            classes: ["ldc", "sheet", "actor"],
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "carateristiques" }]
        });
    }

    get template() {
        if(this.actor.type == "lame") {
            console.log(`Les Lames du Cardinal | type : ${this.actor.type} | chargement du template systems/lames-du-cardinal/templates/sheets/actors/lame-sheet.html`);
            return `systems/lames-du-cardinal/templates/sheets/actors/lame-sheet.html`
        } 
        else {
            console.log(`Les Lames du Cardinal | chargement du template systems/lames-du-cardinal/templates/sheets/actors/${this.actor.type}-sheet.html`);
            return `systems/lames-du-cardinal/templates/sheets/actors/${this.actor.type}-sheet.html`
        }
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.LdC;
        const actorData = data.system;

        //data.archetypes = data.items.filter(function (item) { return item.type == "archetype"});
        //data.expertises = data.items.filter(function (item) { return item.type == "expertise"});

        return data;
    }
}