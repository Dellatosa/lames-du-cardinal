export default class LdCActor extends Actor {

    prepareData() {
        super.prepareData();
        //let data = this.system;
    }

    prepareDerivedData() {
        let data = this.system;

        if(this.type == "Lame") {

            for (let [key, carac] of Object.entries(data.caracteristiques)) {
                if(carac.valeur > carac.max) { carac.valeur = carac.max; }
            }

            for (let [key, comp] of Object.entries(data.competences)) {
                comp.valeur = comp.profil + comp.arcane + comp.pc + comp.exp;
                comp.reussiteAuto = Math.floor(comp.valeur / 2); 
            }

            data.secondaires.tenacite.valueInv = 8 - data.secondaires.tenacite.value;

            data.actor = this
        }
    }

    get isUnlocked() {
        if (this.getFlag(game.system.id, "SheetUnlocked")) return true;
        return false;
    }

    get possedeUneEcole() {
        return this.items.some(function (item) { return item.type == "Ecole"});
    }
    
    get possedeDeuxArcanes() {
        return (this.items.filter(function (item) { return item.type == "Arcane"}).length == 2);
    }

    possedeCetArcane(itemArcane) {
        return this.items.some(function (item) { return item.type == "Arcane" && item.system.numero == itemArcane.system.numero});
    }

    possedeArcaneOppose(itemArcane) {
        return this.items.some(function (item) { return item.type == "Arcane" && 21 - item.system.numero == itemArcane.system.numero});
    }

    get possedeDeuxProfils() {
        return (this.items.filter(function (item) { return item.type == "Profil"}).length == 2);
    }

    possedeCeProfil(item) {
        let profils = this.items.filter(function (item) { return item.type == "Profil"});
        return (profils.length == 1 && profils[0].name == item.name);
    }

    estArcaneBeni(valeurCarte) {
        return this.items.some(function (item) { return item.type == "Arcane" && item.system.numero == valeurCarte});
    }

    estArcaneOppose(valeurCarte) {
        return this.items.some(function (item) { return item.type == "Arcane" && 21 - item.system.numero == valeurCarte});
    }
}