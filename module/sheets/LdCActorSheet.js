import { handsModule } from "../lames-du-cardinal.js";
import * as Cartes from "../Cartes.js";

export default class LdCActorSheet extends ActorSheet {
     
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 750,
            height: 900,
            classes: ["ldc", "sheet", "actor"],
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "carateristiques" }]
        });
    }

    get template() {
        console.log(`Les Lames du Cardinal | chargement du template systems/${game.system.id}/templates/sheets/actors/${this.actor.type.toLowerCase()}-sheet.html`);
        return `systems/${game.system.id}/templates/sheets/actors/${this.actor.type.toLowerCase()}-sheet.html`
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
        data.mainsCartes = game.cards.filter(function (cards) { return cards.type == "hand" && cards.isOwner });

        data.unlocked = this.actor.isUnlocked;

        console.log(handsModule);

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

        if (!this.actor.isUnlocked) return;
        
        Item.fromDropData(data).then((item) => {
            const itemData = duplicate(item);
            switch (itemData.type) {
                case "Arcane":
                    return this._onDropArcaneItem(event, itemData, data);
                case "Profil":
                    return this._onDropProfilItem(event, itemData, data);
                case "Ecole":
                    return this._onDropEcoleItem(event, itemData, data);
                default:
                    return super._onDropItem(event, data);
            }
        });
    }

    async _onDropArcaneItem(event, itemData, data) {
        event.preventDefault();

        if (this.actor.possedeDeuxArcanes) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.deuxArcanes"));
            return;
        }

        if (this.actor.possedeCetArcane(itemData)) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.memeArcane"));
            return;
        }

        if (this.actor.possedeArcaneOppose(itemData)) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.arcaneOppose"));
            return;
        }

        return super._onDropItem(event, data);
    }

    async _onDropProfilItem(event, itemData, data) {
        event.preventDefault();
    
        if (this.actor.possedeDeuxProfils) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.deuxProfils"));
            return;
        }

        if (this.actor.possedeCeProfil(itemData)) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.memeProfil"));
            return;
        }

        let pr = `system.secondaires.contactsProfil.${itemData.name}`; 
        this.actor.update({ [`system.secondaires.contactsProfil.${itemData.name}`] : false });
    
        return super._onDropItem(event, data);
    }

    async _onDropEcoleItem(event, itemData, data) {
        event.preventDefault();

        if (this.actor.possedeUneEcole) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.uneEcole"));
            return;
        }

        return super._onDropItem(event, data);
    }

    async _onSheetChangelock(event) {
        event.preventDefault();
        
        let flagData = await this.actor.getFlag(game.system.id, "SheetUnlocked");
        if (flagData) await this.actor.unsetFlag(game.system.id, "SheetUnlocked");
        else await this.actor.setFlag(game.system.id, "SheetUnlocked", "SheetUnlocked");
        this.actor.sheet.render(true);
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (this.actor.isOwner) {
            /* new ContextMenu(html, ".item-options", this.profilContextMenu); */

            // Vérouiller / dévérouiller la fiche
            html.find(".sheet-change-lock").click(this._onSheetChangelock.bind(this));

            // Supprimer un Item
            html.find(".item-suppr").click(this._onSupprimerItem.bind(this));

            // Affciher la description d'un item dans le chat
            html.find(".item-desc").click(this._onDescriptionItem.bind(this));

            // Cocher une case de caracteristique
            html.find(".case-carac").click(this._onCocherCaracteristique.bind(this));

            // Cocher une case de Ressources
            html.find(".case-ress").click(this._onCocherRessources.bind(this));

            // Cocher une case de Contacts
            html.find(".case-contact").click(this._onCocherContacts.bind(this));

            // Cocher une case de contact de profil
            html.find(".case-profil").click(this._onCocherContactProfil.bind(this));

            // Modifier la valeur d'une caractéristique
            html.find(".mod-carac").click(this._onModifCarac.bind(this));

            // Modifier la valeur de Vitalité, Ténacité, Ressources ou Contacts
            html.find(".mod-car-sec").click(this._onModifCaracSec.bind(this));

            // Modifier la valeur d'une compétence avec des points de création
            html.find(".mod-pc").click(this._onModifCompPC.bind(this));

            // Modifier la valeur d'une compétence avec des points de création
            html.find(".mod-exp").click(this._onModifCompExp.bind(this));

            // Effectuer un test (piocher une ou plusieurs cartes)
            html.find(".draw-cards").click(this._onTestPiocherCartes.bind(this));

            // Piocher la main d'escrime
            html.find(".draw-esc-cards").click(this._onTestPiocherCartesEscrime.bind(this));
        }
    }

    /* profilContextMenu = [
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
    ]; */

    async _onSheetChangelock(event) {
        event.preventDefault();
    
        let flagData = await this.actor.getFlag(game.system.id, "SheetUnlocked");
        if (flagData) await this.actor.unsetFlag(game.system.id, "SheetUnlocked");
        else await this.actor.setFlag(game.system.id, "SheetUnlocked", "SheetUnlocked");
        this.actor.sheet.render(true);
    }

    // Afficher la description de l'item dans un message du chat
    _onDescriptionItem(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let item = this.actor.items.get(element.dataset.itemId);

        item.messageDesc();
    }

    // Supprimer un item de la fiche personnage
    _onSupprimerItem(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const item = this.actor.items.get(element.dataset.itemId);
        const type = element.dataset.type;

        let itemTypeName;
        switch (type) {
            case 'ecole':
                itemTypeName = "l'école d'escrime";
                break;
            case 'feinte':
                itemTypeName = "la feinte";
                break;
            case 'botte':
                itemTypeName = "la botte";
                break;
            case 'arcane':
                itemTypeName = "l'Arcane béni";
                break;
            case 'profil':
                itemTypeName = "le profil";
                break;
            case 'epee':
                itemTypeName = "l'épée";
                break;
            case 'equipement':
                itemTypeName = "l'équipement";
                break;
            case 'contact':
                itemTypeName = "le contact";
                break;
        }

        let content = `<p>Etes-vous certain de vouloir supprimer ${itemTypeName} <b>${item.name}</b> ?<p>`
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

        let pointsUtilises = parseInt(this.actor.system.caracteristiques[carac].utilisee != index ? index : index - 1);

        await this.actor.update({ [`system.caracteristiques.${carac}.utilisee`] : pointsUtilises });
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

    async _onCocherContactProfil(event) {
        event.preventDefault();
        const element = event.currentTarget;
    
        let profil = element.dataset.profil;
        let valeur = this.actor.system.secondaires.contactsProfil[profil];

        await this.actor.update({ [`system.secondaires.contactsProfil.${profil}`] : !valeur });
    }

    async _onModifCaracSec(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let carac = element.dataset.carac;
        let action = element.dataset.action;
        let currentPcRessContacts = parseInt(this.actor.system.pcRessContacts);

        if(action == "minus") {
            let currentVal = parseInt(this.actor.system.secondaires[carac].value);
            if(currentVal > 0) {
                await this.actor.update({ [`system.secondaires.${carac}.value`] : currentVal - 1 });

                if(carac == "ressources" || carac == "contacts") {
                    await this.actor.update({ [`system.pcRessContacts`] : currentPcRessContacts + 1 });
                }
            }
        }
        else if(action == "plus") {

            if ((carac == "ressources" || carac == "contacts") && currentPcRessContacts == 0) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.pcRessContactsVide"));
                return;
            }

            let currentVal = parseInt(this.actor.system.secondaires[carac].value);
            if(currentVal < parseInt(this.actor.system.secondaires[carac].max)) {
                await this.actor.update({ [`system.secondaires.${carac}.value`] : currentVal + 1 });

                if(carac == "ressources" || carac == "contacts") {
                    await this.actor.update({ [`system.pcRessContacts`] : currentPcRessContacts - 1 });
                }
            }
        }
    }

    async _onModifCarac(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let carac = element.dataset.carac;
        let action = element.dataset.action;

        let currentVal = parseInt(this.actor.system.caracteristiques[carac].valeur);
        let currentPcCarac = parseInt(this.actor.system.pcCaracs);

        if(action == "minus") {
            
            if(currentVal > 0) {
                await this.actor.update({ [`system.caracteristiques.${carac}.valeur`] : currentVal - 1 });
                await this.actor.update({ [`system.pcCaracs`] : currentPcCarac + 1 });
            }
        }
        else if(action == "plus") {

            if (currentPcCarac == 0) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.pcCaracVide"));
                return;
            }

            if(currentVal < parseInt(this.actor.system.caracteristiques[carac].max)) {
                await this.actor.update({ [`system.caracteristiques.${carac}.valeur`] : currentVal + 1 });
                await this.actor.update({ [`system.pcCaracs`] : currentPcCarac - 1 });
            }
        }
    }

    async _onModifCompPC(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let comp = element.dataset.comp;
        let action = element.dataset.action;

        let currentCompVal = parseInt(this.actor.system.competences[comp].valeur);
        let currentPcVal = parseInt(this.actor.system.competences[comp].pc);
        let currentPcComp = parseInt(this.actor.system.pcCompetences);

        if (!this.actor.hasTwoProfils) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.deuxProfilsRequis"));
            return;
        }

        if(action == "minus") {
            
            if(currentPcVal > 0) {
                await this.actor.update({ [`system.competences.${comp}.pc`] : currentPcVal - 1 });
                await this.actor.update({ [`system.pcCompetences`] : currentPcComp + 1 });
            }
        }
        else if(action == "plus") {

            if (currentPcComp == 0) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.pcCompVide"));
                return;
            }

            
            if(foundry.utils.getProperty(this.actor.system.competences,`${comp}.profil`) + currentPcVal >= 6) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.compMax"));
                return;
            }

            if(currentCompVal < parseInt(this.actor.system.competences[comp].max)) {
                await this.actor.update({ [`system.competences.${comp}.pc`] : currentPcVal + 1 });
                await this.actor.update({ [`system.pcCompetences`] : currentPcComp - 1 });
            }
        }
    }

    async _onModifCompExp(event) {
        event.preventDefault();
        const element = event.currentTarget;

        let comp = element.dataset.comp;
        let action = element.dataset.action;

        let currentCompVal = parseInt(this.actor.system.competences[comp].valeur);
        let currentExpVal = parseInt(this.actor.system.competences[comp].exp);
        let currentExpDispo = parseInt(this.actor.system.experience.disponible);

        if(action == "minus") {
            
            if(currentExpVal > 0) {
                await this.actor.update({ [`system.competences.${comp}.exp`] : currentExpVal - 1 });
                await this.actor.update({ [`system.experience.disponible`] : currentExpDispo + this.getCoutExpComp(currentCompVal) });
            }
        }
        else if(action == "plus") {

            let compExpCost = this.getCoutExpComp(currentCompVal + 1);

            if (currentExpDispo < compExpCost) {
                ui.notifications.warn(game.i18n.localize("LdC.notification.expInsuffisante"));
                return;
            }

            if(currentCompVal < parseInt(this.actor.system.competences[comp].max)) {
                await this.actor.update({ [`system.competences.${comp}.exp`] : currentExpVal + 1 });
                await this.actor.update({ [`system.experience.disponible`] : currentExpDispo - compExpCost });
            }
        }
    }

    async _onTestPiocherCartes(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const shiftPressed = event.shiftKey;

        
        if(foundry.utils.getProperty(this.actor.system.competences,`${element.dataset.comp}.valeur`) == 0) {
            ui.notifications.warn(game.i18n.localize("LdC.notification.comp0TestNonAutorise"));
            return;
        }

        const deck = game.cards.getName(handsModule.defaultDeck);
        const destPile = game.cards.getName(handsModule.defaultDiscardPile);

        if(shiftPressed) {
           Cartes.TestPiocherCartes(this.actor, "dramatique", deck, destPile, element.dataset.comp);
        }
        else {
            Cartes.TestPiocherCartes(this.actor, "eclair", deck, destPile, element.dataset.comp);
        }
    }

    async _onTestPiocherCartesEscrime() {
        event.preventDefault();
        const element = event.currentTarget;
        //const shiftPressed = event.shiftKey;

        const deck = game.cards.getName(handsModule.defaultDeck);
        const destPile = game.cards.get(element.dataset.handId);

        Cartes.PiocherMainEscrime(this.actor, deck, destPile);
    }

    getCoutExpComp(compVal) {
        if (compVal == 8) {
            return 21;
        }
        else if (compVal == 7) {
            return 14;
        }
        else {
            return compVal;
        }
    }
}