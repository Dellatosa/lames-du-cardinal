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
        data.epees = data.items.filter(function (item) { return item.type == "Epee"});
        data.ecoles = data.items.filter(function (item) { return item.type == "Ecole"});
        data.arcanes = data.items.filter(function (item) { return item.type == "Arcane"});
        data.equipements = data.items.filter(function (item) { return item.type == "Equipement"});
        data.contacts = data.items.filter(function (item) { return item.type == "Contact"});

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            new ContextMenu(html, ".item-options", this.profilContextMenu);

            // Supprimer un profil
            html.find(".profil-suppr").click(this._onSupprimerProfil.bind(this));

            // Supprimer un Arcane
            html.find(".arcane-suppr").click(this._onSupprimerArcane.bind(this));

            // Cocher une case de caracteristique
            html.find(".case-carac").click(this._onCocherCaracteristique.bind(this));

            // Cocher une case de Ressources
            html.find(".case-ress").click(this._onCocherRessources.bind(this));

            // Cocher une case de Contacts
            html.find(".case-contact").click(this._onCocherContacts.bind(this));
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

    _onSupprimerProfil(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const item = this.actor.items.get(element.dataset.itemId);

        let content = `<p>Etes-vous certain de vouloir supprimer le profil <b>${item.name}</b> ?<p>`
        let dlg = Dialog.confirm({
        title: "Confirmation de suppression",
        content: content,
        yes: () => item.delete(),
        //no: () =>, On ne fait rien sur le 'Non'
        defaultYes: false
        });
    }

    _onSupprimerArcane(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const item = this.actor.items.get(element.dataset.itemId);

        let content = `<p>Etes-vous certain de vouloir supprimer l'Arcane béni <b>${item.name}</b> ?<p>`
        let dlg = Dialog.confirm({
        title: "Confirmation de suppression",
        content: content,
        yes: () => item.delete(),
        //no: () =>, On ne fait rien sur le 'Non'
        defaultYes: false
        });
    }

    async _onCocherCaracteristique(event) {
        event.preventDefault();
        const element = event.currentTarget;
    
        let index = element.dataset.index;
        let carac = element.dataset.carac;

        let pointsUtilises = parseInt(this.actor.system.caracteritiques[carac].utilisee != index ? index : index - 1);

        await this.actor.update({ [`system.caracteritiques.${carac}.utilisee`] : pointsUtilises });
    }

    async _onCocherRessources(event) {
        event.preventDefault();
        const element = event.currentTarget;
    
        let index = element.dataset.index;

        let pointsUtilises = parseInt(this.actor.system.secondaires.ressources.utilisee != index ? index : index - 1);

        await this.actor.update({ "system.secondaires.ressources.utilisee" : pointsUtilises });
    }

    async _onCocherContacts(event) {
        event.preventDefault();
        const element = event.currentTarget;
    
        let index = element.dataset.index;

        let pointsUtilises = parseInt(this.actor.system.secondaires.contacts.utilisee != index ? index : index - 1);

        await this.actor.update({ "system.secondaires.contacts.utilisee" : pointsUtilises });
    }
}