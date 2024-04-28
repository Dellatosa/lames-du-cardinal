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
        if(this.actor.type == "Lame") {
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

        data.profils = data.items.filter(function (item) { return item.type == "Profil"});
        data.feintes = data.items.filter(function (item) { return item.type == "Feinte"});
        data.bottes = data.items.filter(function (item) { return item.type == "Botte"});
        
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            new ContextMenu(html, ".item-options", this.profilContextMenu);
        }
    }

    profilContextMenu = [
        {
            name: "Editer",
            icon: '<i class="fas fa-edit"></i>',
            callback: e => {
                const data = e[0].dataset;
                const item = this.actor.items.get(data.itemId);
                item.sheet.render(true);
            }
        },
        {
            name: "Supprimer",
            icon: '<i class="fas fa-trash"></i>',
            callback: e => {
                const data = e[0].dataset;
                const item = this.actor.items.get(data.itemId);

                let content = `<p>${item.type} : ${item.name}<br>Etes-vous certain de vouloir supprimer cet objet ?<p>`
                let dlg = Dialog.confirm({
                title: "Confirmation de suppression",
                content: content,
                yes: () => item.delete(),
                //no: () =>, On ne fait rien sur le 'Non'
                defaultYes: false
                });
            }
        }
    ];
}