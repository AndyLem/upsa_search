class TelescopeApi{

    constructor(){
        this.apiUrl = "https://telescope.epam.com/ui/epam/search/people/autocomplete?start=0&limit=5&entityName=meta%3Apeople-suite%3Apeople-api%3Acom.epam.e3s.app.people.api.data.pluggable.EmployeeEntity&term=";
        this.suggestionUrl = "https://telescope.epam.com";
    }

    get Command(){
        return "t";
    }
    
    BuildUrl(element, handler) {
        handler = handler != null ? handler : this;
        if (element != null)
            return handler.suggestionUrl + element.person.profileLink;
        return handler.suggestionUrl;
    }

    BuildDescription(element) {
        if (element != null)
            return escapeSymbols(element.person.name.fullName) + 
                "<dim> / " + 
                    escapeSymbols(element.person.orgInfo.jobTitle.name) + " | " + 
                    escapeSymbols(element.person.address.work.country.name) + ", " +
                    escapeSymbols(element.person.address.work.city.name) + ", " +
                    escapeSymbols(element.person.address.work.office) + 
                "</dim>";
        return "Telescope: Not Authorized";
    }

    GetSuggestions(text, suggest){
        new BaseApi().GetSuggestions(this.apiUrl+text, suggest, this.BuildUrl, this.BuildDescription, this)
    }

}
