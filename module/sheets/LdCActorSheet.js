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
        console.log(`Les Lames du Cardinal | chargement du template systems/lames-du-cardinal/templates/sheets/actors/${this.actor.type.toLowerCase()}-sheet.html`);
        return `systems/lames-du-cardinal/templates/sheets/actors/${this.actor.type.toLowerCase()}-sheet.html`
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

    /**
   * Handle dropping of an item reference or item data onto an Item Sheet
   *
   * @name _onDropItem
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @private
   * @override
   */
    async _onDropItem(event, data) {
        Item.fromDropData(data).then((item) => {
            const itemData = duplicate(item);
            switch (itemData.type) {
                case "Arcane":
                    return this._onDropArcaneItem(event, itemData, data);
                case "Profil":
                    return this._onDropProfilItem(event, itemData, data);
                default:
                    return super._onDropItem(event, data);
            }
        });
    }

    /**
    * Handle the drop of an Arcane item on the actor sheet
    *
    * @name _onDropMetierItem
    * @param {*} event
    * @param {*} itemData
    */
    async _onDropArcaneItem(event, itemData, data) {
        event.preventDefault();

        //if (!this.actor.isUnlocked) return;

        if (this.actor.hasTwoArcanes) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.deuxArcanes"));
            return;
        }

        if (this.actor.hasThisArcane(itemData)) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.memeArcane"));
            return;
        }

        if (this.actor.hasOpposedArcane(itemData)) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.arcaneOppose"));
            return;
        }

        return super._onDropItem(event, data);
    }

        /**
    * Handle the drop of a Profil item on the actor sheet
    *
    * @name _onDropMetierItem
    * @param {*} event
    * @param {*} itemData
    */
        async _onDropProfilItem(event, itemData, data) {
            event.preventDefault();
    
            //if (!this.actor.isUnlocked) return;
    
            if (this.actor.hasTwoProfils) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.deuxProfils"));
                return;
            }

            if (this.actor.hasThisProfil(itemData)) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.memeProfil"));
                return;
            }
    
            return super._onDropItem(event, data);
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

            // Modifier la valeur de Vitalité ou de Ténacité
            html.find(".mod-car-sec").click(this._onModifCaracSec.bind(this));
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

    async _onModifCaracSec(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let carac = element.dataset.carac;
        let action = element.dataset.action;

        if(action == "minus") {
            let currentVal = parseInt(this.actor.system.secondaires[carac].value);
            if(currentVal > 0) {
                await this.actor.update({ [`system.secondaires.${carac}.value`] : currentVal - 1 });
            }
        }
        else if(action == "plus") {
            let currentVal = parseInt(this.actor.system.secondaires[carac].value);
            if(currentVal < parseInt(this.actor.system.secondaires[carac].max)) {
                await this.actor.update({ [`system.secondaires.${carac}.value`] : currentVal + 1 });
            }
        }
    }
}