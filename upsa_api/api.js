class UpsaApi{

    constructor(){
        this.apiUrl = "https://upsa.epam.com/workload/rest/search/all/";
        this.authorizationUrl = "https://upsa.epam.com/";
        this.apiArguments = "?minResult=3&maxResult=12";
        this.suggestionUrl = "https://upsa.epam.com/workload/employeeView.do?employeeId=";
    }

    get Command(){
        return "u";
    }
    
    BuildUrl(element, handler) {
        handler = handler != null ? handler : this;
        if (element != null)
            return handler.suggestionUrl + element.employeeId;
        return handler.authorizationUrl;
    }

    BuildDescription(element) {
        if (element != null)
            return escapeSymbols(element.employeeName) + "<dim> / " + escapeSymbols(element.title) + "</dim>";
        return "UPSA: Not Authorized"
    }

    GetSuggestions(text, suggest){
        new BaseApi().GetSuggestions(this.apiUrl+text + this.apiArguments, suggest, this.BuildUrl, this.BuildDescription, this)
    }

}
