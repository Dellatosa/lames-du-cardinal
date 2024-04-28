export default class LdCActor extends Actor {

    prepareData() {
        super.prepareData();
        let data = this.system;
    }

    prepareDerivedData() {
        let data = this.system;

        if(this.type == "Lame") {

            for (let [key, carac] of Object.entries(data.caracteritiques)) {
                if(carac.valeur > carac.max) { carac.valeur = carac.max; }
            }

            for (let [key, comp] of Object.entries(data.competences)) {
                if(comp.valeur > comp.max) { comp.valeur = comp.max; }
                comp.reussiteAuto = Math.floor(comp.valeur / 2); 
            }

            if(data.ecole != "") {
                data.ecoleDesc = CONFIG.LdC.ecole[data.ecole].desc;
                data.ecoleSigne = CONFIG.LdC.ecole[data.ecole].signe;
            }
            else {
                data.ecoleDesc = "";
                data.ecoleSigne = "";
            }
        }
    }
}