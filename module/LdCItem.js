export default class  LdCItem extends Item {

    prepareData() {
        super.prepareData();
        this.system.config = CONFIG.LdC;
        let data = this.system;
    }
}