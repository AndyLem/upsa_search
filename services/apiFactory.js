class ApiFactory{
    constructor(){
        this.apis = [
            new UpsaApi(),
            new TelescopeApi()
        ];
    }

    getApi(command){
        for (var i=0;i<this.apis.length;i++){
            if (this.apis[i].Command === command) return this.apis[i];
        }
        return null;
    }
}