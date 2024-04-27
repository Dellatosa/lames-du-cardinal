export default class LdCActor extends Actor {

    prepareData() {
        super.prepareData();
        let data = this.system;

        console.log(this);

        /*
        if(this.type == "Lame") {

            console.log(data.caracteritiques.puissance.valeur);
            console.log(data.caracteritiques.puissance.max);

            if(data.caracteritiques.puissance.valeur > data.caracteritiques.puissance.max)
            data.caracteritiques.puissance.valeur = data.caracteritiques.puissance.max;

            if(data.caracteritiques.vivacite.valeur > data.caracteritiques.vivacite.max)
            data.caracteritiques.vivacite.valeur = data.caracteritiques.vivacite.max;

            if(data.caracteritiques.galanterie.valeur > data.caracteritiques.galanterie.max)
            data.caracteritiques.galanterie.valeur = data.caracteritiques.galanterie.max;

            if(data.caracteritiques.finesse.valeur > data.caracteritiques.finesse.max)
            data.caracteritiques.finesse.valeur = data.caracteritiques.finesse.max;
        }
        */
    }
}