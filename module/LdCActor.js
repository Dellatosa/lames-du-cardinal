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

                if(carac.signe == "griffe" || carac.signe == "souffle") {
                    carac.couleur = "noir"
                }
                else if(carac.signe == "ecaille" || carac.signe == "sang") {
                    carac.couleur = "rouge"
                }
            }

            console.log(data);

            for (let [key, comp] of Object.entries(data.competences)) {
                if(comp.valeur > comp.max) { comp.valeur = comp.max; }
                comp.reussiteAuto = Math.floor(comp.valeur / 2); 
            }
        }
    }
}