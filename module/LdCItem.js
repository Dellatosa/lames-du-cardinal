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
    }
}