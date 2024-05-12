export default class LdCActor extends Actor {

    prepareData() {
        super.prepareData();
        //let data = this.system;
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

            data.secondaires.tenacite.valueInv = 8 - data.secondaires.tenacite.value; 
        }
    }

    get hasTwoArcanes() {
        return (this.items.filter(function (item) { return item.type == "Arcane"}).length == 2);
    }

    hasThisArcane(item) {
        let arcanes = this.items.filter(function (item) { return item.type == "Arcane"});
        return (arcanes.length == 1 && arcanes[0].system.numero == item.system.numero);
    }

    hasOpposedArcane(item) {
        let arcanes = this.items.filter(function (item) { return item.type == "Arcane"});
        return (arcanes.length == 1 && 21 - arcanes[0].system.numero == item.system.numero);
    }

    get hasTwoProfils() {
        return (this.items.filter(function (item) { return item.type == "Profil"}).length == 2);
    }

    hasThisProfil(item) {
        let profils = this.items.filter(function (item) { return item.type == "Profil"});
        return (profils.length == 1 && profils[0].name == item.name);
    }
}