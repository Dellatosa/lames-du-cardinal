export default class  LdCItem extends Item {

    prepareData() {
        super.prepareData();
        this.system.config = CONFIG.LdC;
        let data = this.system;
    }

    prepareDerivedData() {
        let data = this.system;

        if(this.type == "Epee") {

            if(data.feinte1 != "aucun") {
                data.feinte1Nom = game.items.get(data.feinte1).name;
                data.feinte1Desc = game.items.get(data.feinte1).system.description;
            }
            else {
                data.feinte1Nom = "";
                data.feinte1Desc = "";
            }

            if(data.feinte2 != "aucun") {
                data.feinte2Nom = game.items.get(data.feinte2).name;
                data.feinte2Desc = game.items.get(data.feinte2).system.description;
            }
            else {
                data.feinte2Nom = "";
                data.feinte2Desc = "";
            }
        }

        if(this.type == "Feinte") {
            if(game.items.get(data.ecole)) {
                data.ecoleSigne = game.items.get(data.ecole).system.signe;
                data.ecoleNom = game.items.get(data.ecole).name;
            }
            else if (data.ecole == "epee") {
                data.ecoleSigne = "epee";
                data.ecoleNom = "Feinte d'épee";
            }
            else {
                data.ecoleSigne = "";
                data.ecoleNom = "";
            }
        }

        if(this.type == "Botte") {
            if(game.items.get(data.ecole)) {
                data.ecoleSigne = game.items.get(data.ecole).system.signe;
                data.ecoleNom = game.items.get(data.ecole).name;
            }
            else {
                data.ecoleSigne = "";
                data.ecoleNom = "";
            }
        }

        if(this.type == "Arcane") {
             data.arcaneOppose = game.items.find(function (item) { return item.system.numero == 21 - data.numero});
        }

        if(this.type == "Ecole") {
            if(data.signe == "griffe" || data.signe == "souffle") {
                data.couleur = "noir"
            }
            else if(data.signe == "ecaille" || data.signe == "sang") {
                data.couleur = "rouge"
            }
        }
    }

    // Mise à jour des Active effects de profils
    updateProfilActiveEffects() {
        for (let [key, comp] of Object.entries(CONFIG.LdC.competences)) {

            if(key != "aucun") {
                if(this.effects.getName(key) != null) {
                    this.effects.getName(key).delete();
                }

                console.log(`Création de l'active effect ${key}`, this.system[key]);
                const effectData = {
                    label: key,
                    icon: "icons/svg/combat.svg",
                    changes: [{
                        key: `system.competences.${key}.valeur`,
                        mode: 2,
                        value: this.system[key]
                    }],
                    duration: {},
                    flags: {},
                };
                this.createEmbeddedDocuments("ActiveEffect", [effectData]);
            }
        }
    }

    // Mise à jour de l'Active effect de l'Arcane
    updateArcaneActiveEffect() {
        let comp = this.system.competence;

        this.transferredEffects.forEach( effect => {
            effect.delete();
        });

        console.log(`Création de l'active effect ${comp}`);
        const effectData = {
            label: comp,
            icon: "icons/svg/combat.svg",
            changes: [{
                key: `system.competences.${comp}.valeur`,
                mode: 2,
                value: "1"
            }],
            duration: {},
            flags: {},
        };

        this.createEmbeddedDocuments("ActiveEffect", [effectData]);
    }
}