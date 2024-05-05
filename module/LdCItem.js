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

        if(this.type == "Arcane") {
             data.arcaneOppose = game.items.find(function (item) { return item.system.numero == 21 - data.numero});
        }
    }

    updateActiveEffects() {
        for (let [key, comp] of Object.entries(CONFIG.LdC.competences)) {

            if(key != "aucun") {
                if(this.effects.getName(key) != null) {
                    this.effects.getName(key).delete();
                }

                console.log(`Création de l'active effect ${this.effects.getName(key).name}`, this.system[key]);
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

                console.log(this.effects.getName(key));
            }
        }
    }
}